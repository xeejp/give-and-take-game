defmodule GiveAndTakeGame.Host do
  alias GiveAndTakeGame.Main
  alias GiveAndTakeGame.Actions

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def reset(data) do
    %{data |
      game_page: "waiting",
      participants: data.participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{ state |
                        role: "visitor",
                        point: 0,
                        pair_id: nil,
                      }}
                    end)
                    |> Enum.into(%{}),
      pairs: %{},
      results: %{},
    }
    |> Actions.reseted()
  end

  def sync_game_progress(data, game_progress) do
    Actions.sync_game_progress(data, game_progress)
  end

  def sync_participants_length(data, participants_length) do
    Actions.sync_participants_length(data, participants_length)
  end

  def show_results(data, results) do
    Actions.show_results(data, results)
  end

  def change_page(data, game_page) do
    if game_page in Main.pages do
      %{data | game_page: game_page}
      |> Actions.change_page(game_page)
    else
      data
    end
  end

  def match(data) do
    %{participants: participants} = data
    participants = participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{ state |
                        role: "visitor",
                        point: 0,
                        pair_id: nil,
                      }}
                    end)
                    |> Enum.into(%{})
    group_size = 2
    groups = participants
              |> Enum.map(&elem(&1, 0)) # [id...]
              |> Enum.shuffle
              |> Enum.chunk(group_size)
              |> Enum.map_reduce(0, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1} end) |> elem(0) # [{0, p0}, ..., {n-1, pn-1}]
              |> Enum.into(%{})

    updater = fn participant, pair_id, role ->
      %{ participant |
        role: role,
        point: 0,
        pair_id: pair_id
      }
    end
    reducer = fn {group, ids}, {participants, pairs} ->
      [id1, id2] = ids
      participants = participants
                      |> Map.update!(id1, &updater.(&1, group, "even"))
                      |> Map.update!(id2, &updater.(&1, group, "odd"))

      pairs = Map.put(pairs, group, Main.new_pair(ids))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, groups} = Enum.reduce(groups, acc, reducer)

    %{data | participants: participants, pairs: groups}
    |> Actions.matched()
  end
  
  def format_contents(data) do
    data
  end
end