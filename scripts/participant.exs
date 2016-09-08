defmodule GiveAndTakeGame.Participant do
  alias GiveAndTakeGame.Actions

  alias GiveAndTakeGame.Main

  require Logger
  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def submit_give(data, id) do
    target_id = getTargetId(data, id)
    pair_id = get_in(data, [:participants, id, :pair_id])
    id_role = case get_in(data, [:participants, id, :role]) do
      "even" -> :even
      "odd"  -> :odd
    end
    target_id_role = case get_in(data, [:participants, target_id, :role]) do
      "even" -> :even
      "odd"  -> :odd
    end
    pair_turn = get_in(data, [:pairs, pair_id, :pair_turn])
    data
    |> put_in([:pairs, pair_id, :pair_state], case pair_turn < 10 do
      true -> "during"
      false -> "finished"
    end)
    |> put_in([:pairs, pair_id, :pair_turn], case pair_turn < 10 do
      true -> pair_turn + 1
      false -> pair_turn
    end)
    |> put_in([:participants, id, :point], case pair_turn < 10 do
      true -> elem(get_in(Main.prizes, [id_role]), pair_turn)
      false -> elem(get_in(Main.prizes, [id_role]), 10)
    end)
    |> put_in([:participants, target_id, :point], case pair_turn < 10 do
      true -> elem(get_in(Main.prizes, [target_id_role]), pair_turn)
      false -> elem(get_in(Main.prizes, [target_id_role]), 10)
    end)
    |> Actions.submit_give(id, target_id, pair_id)
  end

  def submit_take(data, id) do
    target_id = getTargetId(data, id)
    pair_id = get_in(data, [:participants, id, :pair_id])
    id_role = case get_in(data, [:participants, id, :role]) do
      "even" -> :even
      "odd"  -> :odd
    end
    target_id_role = case get_in(data, [:participants, target_id, :role]) do
      "even" -> :even
      "odd"  -> :odd
    end
    pair_turn = get_in(data, [:pairs, pair_id, :pair_turn])
    data
    |> put_in([:pairs, pair_id, :pair_state], "finished")
    |> put_in([:participants, id, :point], elem(get_in(Main.prizes, [id_role]), pair_turn))
    |> put_in([:participants, target_id, :point], elem(get_in(Main.prizes, [target_id_role]), pair_turn))
    |> Actions.submit_take(id, target_id, pair_id)
  end

  # utils
  def getTargetId(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
  end

  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      game_page: data.game_page,
      game_progress: data.game_progress,
    }
  end

  def format_pair(pair) do
    %{
      members: pair.members,
      pair_turn: pair.pair_turn,
      pair_state: pair.pair_state,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    pair_id = get_in(data, [:participants, id, :pair_id])
    unless is_nil(pair_id) do
      pair = get_in(data, [:pairs, pair_id])
      format_participant(participant)
      |> Map.merge(format_data(data))
      |> Map.merge(format_pair(pair))
    else
      format_participant(participant)
      |> Map.merge(format_data(data))
    end
  end
end
