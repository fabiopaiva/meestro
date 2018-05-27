require 'test_helper'

class SpotifyControllerTest < ActionDispatch::IntegrationTest
  setup do
    @spotify = spotify(:one)
  end

  test "should get index" do
    get spotify_index_url, as: :json
    assert_response :success
  end

  test "should create spotify" do
    assert_difference('Spotify.count') do
      post spotify_index_url, params: { spotify: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show spotify" do
    get spotify_url(@spotify), as: :json
    assert_response :success
  end

  test "should update spotify" do
    patch spotify_url(@spotify), params: { spotify: {  } }, as: :json
    assert_response 200
  end

  test "should destroy spotify" do
    assert_difference('Spotify.count', -1) do
      delete spotify_url(@spotify), as: :json
    end

    assert_response 204
  end
end
