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
        game_page: "waiting",
        game_progress: 0,
        participants: %{},
        pairs: %{},
        results: %{},
      }
    }}
  end

  def wrap_result({:ok, _} = result), do: result
  def wrap_result(result), do: Main.wrap(result)

  def join(data, id) do
    result = unless Map.has_key?(data.participants, id) do
      new = Main.new_participant()
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
    wrap_result(result)
  end
  
  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Give and Take Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"SYNC_GAME_PROGRESS", game_progress} -> Host.sync_game_progress(data, game_progress)
      {"SYNC_PARTICIPANTS_LENGTH", participants_length} -> Host.sync_participants_length(data, participants_length)
      {"SHOW_RESULTS", results} -> Host.show_results(data, results)
      {"MATCH", _} -> Host.match(data)
      {"RESET", _} -> Host.reset(data)
      {"CHANGE_PAGE", page} -> Host.change_page(data, page)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Give and Take Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Participant.fetch_contents(data, id)
      {"SUBMIT_GIVE", _} -> Participant.submit_give(data, id)
      {"SUBMIT_TAKE", _} -> Participant.submit_take(data, id)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end
end
