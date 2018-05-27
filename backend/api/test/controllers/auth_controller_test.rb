require 'test_helper'

class AuthControllerTest < ActionDispatch::IntegrationTest
  setup do
    @auth = auth(:one)
  end

  test "should get index" do
    get auth_index_url, as: :json
    assert_response :success
  end

  test "should create auth" do
    assert_difference('Auth.count') do
      post auth_index_url, params: { auth: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show auth" do
    get auth_url(@auth), as: :json
    assert_response :success
  end

  test "should update auth" do
    patch auth_url(@auth), params: { auth: {  } }, as: :json
    assert_response 200
  end

  test "should destroy auth" do
    assert_difference('Auth.count', -1) do
      delete auth_url(@auth), as: :json
    end

    assert_response 204
  end
end
