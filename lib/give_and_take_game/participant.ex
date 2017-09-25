defmodule GiveAndTakeGame.Participant do
  alias GiveAndTakeGame.Actions
  alias GiveAndTakeGame.Main

  require Logger
  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def submit_give(data, id) do
    target_id = get_target_id(data, id)
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
      true -> elem(get_in(data.prizes, [id_role]), pair_turn)
      false -> elem(get_in(data.prizes, [id_role]), 10)
    end)
    |> put_in([:participants, target_id, :point], case pair_turn < 10 do
      true -> elem(get_in(data.prizes, [target_id_role]), pair_turn)
      false -> elem(get_in(data.prizes, [target_id_role]), 10)
    end)
    |> put_in([:results], Map.merge(get_in(data, [:results]), %{
        Integer.to_string(pair_turn) => Map.merge(get_in(data, [:results,
           Integer.to_string(pair_turn)]) || %{}, %{
            give: (get_in(data, [:results, Integer.to_string(pair_turn), :give]) || 0) + 1
          })
       })
    )
  end

  def submit_take(data, id) do
    target_id = get_target_id(data, id)
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
    |> put_in([:participants, id, :point], elem(get_in(data.prizes, [id_role]), pair_turn-1))
    |> put_in([:participants, target_id, :point], elem(get_in(data.prizes, [target_id_role]), pair_turn-1))
    |> put_in([:results], Map.merge(get_in(data, [:results]), %{
        Integer.to_string(pair_turn) => Map.merge(get_in(data, [:results,
           Integer.to_string(pair_turn)]) || %{}, %{
            take: (get_in(data, [:results, Integer.to_string(pair_turn), :take]) || 0) + 1
          })
       })
    )
  end

  # utils
  def get_target_id(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
  end

  def get_filter(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id]) || :default
    %{
      game_page: true,
      game_progress: true,
      dynamic_text: true,
      pairs: %{
        pair_id => true
      },
      participants: %{
        id => true
      },
      participants_number: "participantsNumber",
      _spread: [[:participants, id], [:pairs, pair_id]]
    }
  end
  
  def filter_data(data, id) do
    data
    |> Transmap.transform(get_filter(data, id), diff: false)
    |> Map.delete(:participants)
    |> Map.delete(:pairs)
    |> Map.put_new(:members, [])
    |> Map.put_new(:pair_turn, 1)
    |> Map.put_new(:pair_state, "during")
  end
end
