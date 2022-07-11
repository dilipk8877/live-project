import React, { useEffect, useState } from "react";
import recipee from "../../assets/meals/recipee.svg";
import meal from "../../assets/meals/meal.svg";
import arrow from "../../assets/meals/arrow.svg";
import rightarrow from "../../assets/meals/rightarrow.svg";

import "./food.styles.scss";
import ChooseMealsPage from "../../components/choose-meals/choosemeals.component";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import CalendarItems from "../../components/CalendarItems/CalendarItems";
import CreateRecipee from "../../components/create-recipee/CreateRecipee.component";
const FoodPage = () => {
  let today = startOfToday();

  const [currentNum, setCurrentNum] = useState(new Date().getDate());
  const [modalView, setModalView] = useState(false);
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentWeek, setCurretWeek] = useState(today);
  const dayNum = getDay(today);
  const weekStart = startOfWeek(
    currentWeek,
    { weekStartsOn: dayNum },
    { days: 7 }
  );
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: dayNum }, { days: 7 });

  let days = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });

  function previousWeek() {
    let firstDayOfNextWeek = add(weekStart, { weeks: -1 });
    setCurretWeek(firstDayOfNextWeek);
  }

  function nextWeek() {
    let firstDayOfNextWeek = add(weekStart, { weeks: 1 });
    setCurretWeek(firstDayOfNextWeek);
  }

  function showTodayWeek() {
    setCurretWeek(today);
  }

  // Meal Category Array
  const mealCategories = [
    { type: "Breakfast", checked: true },
    { type: "Lunch", checked: false },
    { type: "Dinner", checked: false },
  ];

  const [mealCategory, setMealCategory] = useState(mealCategories);

  const handleChekBox = (e) => {
    let name = e.target.value;
    let checkedIItem = e.target.checked;
    setMealCategory((p) =>
      p.map((el) => (el.type === name ? { ...el, checked: checkedIItem } : el))
    );
  };

  const [sideBarItems, setSideBarItems] = useState({
    recipee: false,
    meal: true,
  });

  return (
    <div className="meal_plan_row">
      <div className="recipee_sidebar">
        <h3>Food</h3>
        <ul>
          <li
            id="1"
            onClick={() =>
              setSideBarItems({
                meal: false,
                recipee: true,
              })
            }
            className={sideBarItems.recipee ? "active" : ""}
          >
            <img src={recipee} /> Recipies
          </li>
          <li
            onClick={() =>
              setSideBarItems({
                meal: true,
                recipee: false,
              })
            }
            className={sideBarItems.meal ? "active" : ""}
          >
            <img src={meal} /> Meal Planner
          </li>
        </ul>
      </div>

      {sideBarItems.meal && (
        <div className="meal_planner_col">
          <div className="meal_planner_row">
            <div className="meals_today">
              <h4>Meal Planner</h4>
              <button onClick={() => showTodayWeek()}>Today</button>
              <div className="arrows">
                <button onClick={previousWeek}>
                  <img src={arrow} />
                </button>
                <button onClick={nextWeek}>
                  <img src={rightarrow} />
                </button>
              </div>
              <span className="time_between">
                {format(weekStart, "MMMM d")} -{" "}
                {format(weekStart, "MMMM") !== format(weekEnd, "MMMM")
                  ? format(weekEnd, "MMMM d")
                  : format(weekEnd, "d")}
              </span>
            </div>
            <div className="lunch_type">
              {mealCategory.map((el, i) => (
                <label>
                  <input
                    type="radio"
                    name="food"
                    value={el.type}
                    checked={el.checked}
                    onChange={(e) => handleChekBox(e, el.checked)}
                  ></input>
                  <span></span>
                  {el.type}
                </label>
              ))}
            </div>
          </div>
          <div className="mealsday_row">
            {days.map((day) => (
              <CalendarItems
                mealDay={format(new Date(day), "EEEE")}
                mealDate={format(day, "d")}
                setModalView={setModalView}
              />
            ))}

            {modalView && <ChooseMealsPage setModalView={setModalView} />}

            {/* <div className="meals_col">
            <h6 className="meal_day">SAT</h6>
            <h5 className="meals_date">18</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>
          <div className="meals_col">
            <h6 className="meal_day">SUN</h6>
            <h5 className="meals_date">19</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>
          <div className="meals_col">
            <h6 className="meal_day">MON</h6>
            <h5 className="meals_date">20</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>

          <div className="meals_col">
            <h6 className="meal_day">TUE</h6>
            <h5 className="meals_date">21</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>
          <div className="meals_col">
            <h6 className="meal_day">WED</h6>
            <h5 className="meals_date">22</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>
          <div className="meals_col"> 
            <h6 className="meal_day">THU</h6>
            <h5 className="meals_date">23</h5>
            <div className="dish_with_swap">
              <img src={fried} />

              <h4 className="dishname">Fried Eggs</h4>
              <div className="swap_rate">
                <span>Swap</span>
                <span>Choose</span>
                <span>Rate</span>
              </div>
            </div>
          </div>*/}
          </div>
        </div>
      )}

      {sideBarItems.recipee && <CreateRecipee />}
    </div>
  );
};

export default FoodPage;
