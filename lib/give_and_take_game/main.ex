defmodule GiveAndTakeGame.Main do
  require Logger
  alias GiveAndTakeGame.Host
  alias GiveAndTakeGame.Participant

  @pages ["waiting", "description", "experiment", "result"]
  @roles ["visitor", "even", "odd"]
  @states ["during", "finished"]
  @prizes %{
    even: {0, -1, 2, 1, 4, 3, 6, 5, 8, 7, 10},
    odd:  {0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10},
  }

  def pages, do: @pages
  def roles, do: @roles
  def states, do: @states
  def prizes, do: @prizes

  def wrap(data) do
    {:ok, %{data: data}}
  end

  def initial do
  end

  def compute_diff(old, %{"data" => new} = result) do
    compute_diff(old, %{data: new})
  end
  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end

  def new_participant do
    %{
      point: 0,
      role: "visitor",
      pair_id: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      pair_turn: 1,
      pair_state: "during",
    }
  end
end
