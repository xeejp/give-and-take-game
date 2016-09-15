defmodule GiveAndTakeGame do
  use XeeThemeScript
  require Logger

  alias GiveAndTakeGame.Host
  alias GiveAndTakeGame.Participant
  alias GiveAndTakeGame.Main
  alias GiveAndTakeGame.Actions

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
        participants_number: 0,
        game_page: "waiting",
        game_progress: 0,
        participants: %{},
        pairs: %{},
        results: %{},
      }
    }}
  end

  def compute_game_progress(data) do
    pairs_size = Map.get(data, :pairs) |> map_size()
    pairs_length = case (pairs_size) do
      0 -> 1
      x -> x
    end
    finished_pairs = Map.get(data, :pairs) |> Enum.count(fn {_, pair} -> pair.pair_state == "finished" end)
    Map.put(data, :game_progress, round(100 * finished_pairs / pairs_length))
  end

  def wrap_result(old, {:ok, result}) do
    result = Map.update!(result, :data, fn new ->
      new |> compute_game_progress()
    end)
    {:ok, Main.compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    new = new |> compute_game_progress()
    {:ok, Main.compute_diff(old, %{data: new})}
  end

  def join(data, id) do
    result = unless Map.has_key?(data.participants, id) do
      new = Main.new_participant()
      put_in(data, [:participants, id], new)
      |> Map.update!(:participants_number, fn n -> n + 1 end)
    else
      data
    end
    wrap_result(data, result)
  end
  
  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Give and Take Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"MATCH", _} -> Host.match(data)
      {"RESET", _} -> Host.reset(data)
      {"CHANGE_PAGE", page} -> Host.change_page(data, page)
      {"SHOW_RESULTS", results} -> Actions.show_results(data, results)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Give and Take Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Participant.fetch_contents(data, id)
      {"SUBMIT_GIVE", _} -> Participant.submit_give(data, id)
      {"SUBMIT_TAKE", _} -> Participant.submit_take(data, id)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end
end
