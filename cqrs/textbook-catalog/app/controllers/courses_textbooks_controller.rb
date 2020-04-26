class CoursesTextbooksController < ApplicationController
  before_action :set_courses_textbook, only: [:show, :edit, :update, :destroy]

  # GET /courses_textbooks
  # GET /courses_textbooks.json
  def index
    @courses_textbooks = CoursesTextbook.all
  end

  # GET /courses_textbooks/1
  # GET /courses_textbooks/1.json
  def show
  end

  # GET /courses_textbooks/new
  def new
    @courses_textbook = CoursesTextbook.new
  end

  # GET /courses_textbooks/1/edit
  def edit
  end

  # POST /courses_textbooks
  # POST /courses_textbooks.json
  def create
    @courses_textbook = CoursesTextbook.new(courses_textbook_params)

    respond_to do |format|
      if @courses_textbook.save
        format.html { redirect_to @courses_textbook, notice: 'Courses textbook was successfully created.' }
        format.json { render :show, status: :created, location: @courses_textbook }
      else
        format.html { render :new }
        format.json { render json: @courses_textbook.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /courses_textbooks/1
  # PATCH/PUT /courses_textbooks/1.json
  def update
    respond_to do |format|
      if @courses_textbook.update(courses_textbook_params)
        format.html { redirect_to @courses_textbook, notice: 'Courses textbook was successfully updated.' }
        format.json { render :show, status: :ok, location: @courses_textbook }
      else
        format.html { render :edit }
        format.json { render json: @courses_textbook.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /courses_textbooks/1
  # DELETE /courses_textbooks/1.json
  def destroy
    @courses_textbook.destroy
    respond_to do |format|
      format.html { redirect_to courses_textbooks_url, notice: 'Courses textbook was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_courses_textbook
      @courses_textbook = CoursesTextbook.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def courses_textbook_params
      params.require(:courses_textbook).permit(:course_id, :textbook_id)
    end
end
