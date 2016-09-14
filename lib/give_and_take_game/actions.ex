defmodule GiveAndTakeGame.Actions do
  alias GiveAndTakeGame.Participant
  alias GiveAndTakeGame.Host

  require Logger
  # Host
  def reseted(data) do
    host_action = get_action("reseted", %{participants: data.participants})
    action = get_action("reseted", nil)
    format(data, host_action, dispatch_to_all(data, action))
  end

  def change_page(data, game_page) do
    action = get_action("change page", game_page)
    format(data, nil, dispatch_to_all(data, action))
  end


  def sync_game_progress(data, game_progress) do
    participant = get_action("sync game progress", game_progress)
    host = get_action("sync game progress", game_progress)
    format(data, host, dispatch_to_all(data, participant))
  end

  def sync_participants_length(data, participants_length) do
    action = get_action("sync participants length", participants_length)
    format(data, nil, dispatch_to_all(data, action))
  end

  # Participant
  def show_results(data, results) do
    action = get_action("show results", results)
    format(data, nil, dispatch_to_all(data, action))
  end

  def submit_give(data, id, target_id, pair_id) do
    host = get_action("give", %{id: id, target_id: target_id, pair_id: pair_id})
    target = get_action("submit give", nil)
    format(data, host, dispatch_to(target_id, target))
  end

  def submit_take(data, id, target_id, pair_id) do
    host = get_action("take", %{id: id, target_id: target_id, pair_id: pair_id})
    target = get_action("submit take", nil)
    format(data, host, dispatch_to(target_id, target))
  end

  def join(data, id, participant) do
    action = get_action("join", %{id: id, participant: participant})
    format(data, action)
  end

  def matched(%{participants: participants, pairs: pairs} = data) do
    host = get_action("matched", %{participants: participants, pairs: pairs})
    participant = Enum.map(participants, fn {id, p} ->
      unless p.pair_id == nil do
        payload = Map.merge(Participant.format_participant(p), Participant.format_pair(Map.get(pairs, p.pair_id)))
      else
        payload = Participant.format_participant(p)
      end
      {id, %{action: get_action("matched", payload)}}
    end) |> Enum.into(%{})
    format(data, host, participant)
  end

  def update_host_contents(data) do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.format_contents(data, id)))
    format(data, nil, participant)
  end

  # Utilities

  def get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  def dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  def dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  def format(data, host, participants \\ nil) do
    result = %{"data" => data}
    unless is_nil(host) do
      result = Map.put(result, "host", %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, "participant", participants)
    end
    {:ok, result}
  end
end