class DarkroomController < ApplicationController
  def index
    logger.debug("Index action!")
    @events = Event.select(:userid,:date,:start,:end,:allday)
    @users = User.select(:id, :name, :email)
    
    respond_to do |format|
      format.html 
      format.json { render :json => { events: @events, users: @users } }
    end
  end

  # def event_hm
  #   start.strftime('%H:%M')
  #   start.strftime('%H:%M')
  # end

  # def show
  #   @events = Event.select(:userid,:date,:start,:end,:allday)
  #   @users = User.select(:id, :name, :email)
  #   render :events: @events, users: @users }
  # end

  def new
    logger.debug("New Action!")
    @event = Event.new()
  end

  def create
    logger.debug("Create Action!")
    @event = Event.create(event_params)

    redirect_to :root
  end

  private
  def event_params
    params.permit(:userid, :date, :start, :end)
  end

end
