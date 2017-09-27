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
  end

  def change_page(data, game_page) do
    if game_page in Main.pages do
      %{data | game_page: game_page}
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
        point: if role == "even" do elem(data.prizes.even, 0) else elem(data.prizes.odd, 0) end,
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
  end

  def get_filter(data) do
    %{
      _default: true,
      prizes: false,
      participants_number: "participantsNumber"
    }
  end
  
  def filter_diff(data, diff) do
    Transmap.transform(diff, get_filter(data), diff: true)
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end

  def update_question(data, dynamic_text) do
    %{data | dynamic_text: dynamic_text}
  end

  def update_config(data, config) do
    [[e1, e2, e3], [o1, o2, o3]] = config
    {a, _} = [0, 0, 0, 0, 0] |> Enum.map_reduce(e1, fn _, acc -> {acc, acc + e3} end)
    {b, _} = [0, 0, 0, 0, 0] |> Enum.map_reduce(e2, fn _, acc -> {acc, acc + e3} end)
    even = (Enum.zip(a, b) |> Enum.map(fn {x, y} -> [x, y] end) |> Enum.concat) ++ [e1 + e3 * 5]
    {c, _} = [0, 0, 0, 0, 0] |> Enum.map_reduce(o1, fn _, acc -> {acc, acc + o3} end)
    {d, _} = [0, 0, 0, 0, 0] |> Enum.map_reduce(o2, fn _, acc -> {acc, acc + o3} end)
    odd  = (Enum.zip(c, d) |> Enum.map(fn {x, y} -> [x, y] end) |> Enum.concat) ++ [o1 + o3 * 5]
    %{data | config: config, prizes: %{even: even |> List.to_tuple, odd: odd |> List.to_tuple}, prizes_l: %{even: even, odd: odd}}
  end

  def visit(data) do
    %{data | isFirstVisit: false}
  end

  def update_paircount(data, params) do
    %{data | pairCount: params}
  end
end
