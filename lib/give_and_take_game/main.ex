defmodule GiveAndTakeGame.Main do

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
    {:ok, %{"data" => data}}
  end

  def initial do
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
