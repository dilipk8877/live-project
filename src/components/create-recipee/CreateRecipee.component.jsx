import React, { useState } from "react";
import "./createRecipee.style.scss";
import selectimage from "../../assets/food/upload.png";
import del from "../../assets/food/delete.png";
import edit from "../../assets/food/edit.png";
import sort from "../../assets/food/sort.png";
import DropDown from "../drop-down/DropDown";
import { id } from "date-fns/locale";
import { Upload } from "./Upload";

import 'rsuite/dist/rsuite.min.css';
import { Cascader } from 'rsuite';
import { DropDownList } from "./DropDown";
import Categoriess from "./Categoriess";


const CreateRecipee = () => {
  const [addIngOpen, setAddIngOpen] = useState(false);
  const [preprationStep, setPreprationStep] = useState(false);
  const [ingInfo, setIngInfo] = useState({
    ingredient: "",
    quantity: "",
    qType: "",
  });

  const [pStepInfo, setPStepInfo] = useState("");
  const addIngredient = () => {
    setAddIngOpen(true);
  };
  let [arr, setArr] = useState([]);
  let [preArr, setPreArr] = useState([]);
  const [toggleItems, setToggleItems] = useState(true)
  const [isEditItems, setIsEditItems] = useState(null)
  const [toggleItem, setToggleItem] = useState(true)
  const [isEditItem, setIsEditItem] = useState(null)


  const saveIngredient = () => {
    if (!ingInfo) {
      alert("please fill all the data")
    } else if (ingInfo && !toggleItems) {
      setArr([...arr.filter((val) => {
        return val.id != isEditItems
      }), ingInfo])
      setToggleItems(true)
      setIngInfo({
        ingredient: "",
        quantity: "",
        qType: ""
      })
      setIsEditItems(null)
    }
    else {
      setAddIngOpen(false);
      let id = new Date().getTime().toString()
      setArr([...arr, { id, ...ingInfo }])
      setIngInfo({
        ingredient: "",
        quantity: "",
        qType: ""
      })
      console.log(arr)
    }
  }

  const editArr = (ind) => {
    const updateEditData = arr.find((val) => {
      return val.id == ind
    })
    console.log(updateEditData)
    setToggleItems(false)
    setIngInfo(updateEditData)
    setIsEditItems(ind)
    setAddIngOpen(true);

  }
  const deleteArr = (ind) => {
    const updateArr = arr.filter((val) => {
      return ind !== val.id
    })
    setArr(updateArr)
  }

  const handleChange = (e) => {
    let name = e.target.name;
    setIngInfo({ ...ingInfo, [name]: e.target.value });
  };


  const handlePrepration = () => {
    setPreprationStep(true);
  };

  const savePrepration = () => {
    if (!pStepInfo) {
      alert("please fill the Data")
    } else if (pStepInfo && !toggleItem) {
      setPreArr(
        preArr.map((res) => {
          if (res.id === isEditItem) {
            return { ...res, info: pStepInfo }
          }
          return res;
        })
      )
      setToggleItem(true)
      setPStepInfo('')

      setIsEditItem(null)
    } else {
      setPreprationStep(false);
      const allpost = { id: new Date().getTime().toString(), info: pStepInfo }
      setPreArr([...preArr, allpost])
      setPStepInfo('')
    }
  }

  // <----------------editItem-------------->

  const editPreArr = (id) => {
    let newEditItem = preArr.find((res) => {
      return res.id === id
    })
    console.log(newEditItem)
    setToggleItem(false)
    setPStepInfo(newEditItem.info)
    setPreprationStep(true);
    setIsEditItem(id)
  }

  const deletePreArr = (ind) => {
    const deleteItems = preArr.filter((res) => {
      return ind !== res.id
    })
    setPreArr(deleteItems)
  }
  return (
    <>
      <div className="create_recipe_main">
        <div className="title_recipe">
          <p>Create Recipe</p> <button className="btn-default">Save</button>
        </div>
        <div className="recipe_content">
          <div className="general_info">
            <h3>General Information</h3>
            <div className="input-box">
              <h4>Recipe Name</h4>
              <input type="text" className="custom_input" />
              <div className="drop-image">
                {/* <img src={selectimage} />
                <div>
                  <p>
                    Drop your image here, or{" "}
                    <span className="text-default">Browse</span>
                  </p>
                  <p className="small-text">Supports: JPG, GIF, PNG</p>
                  <input className="files-upload" type="file" />
                </div> */}

                <Upload
                // onDrop={files => {
                //   console.log(files);
                // }}
                />
              </div>
            </div>
            <div className="serving-size">
              <h3>Serving Size</h3>
              <div className="serving-select">
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="visibility">
              <h3>Visibility</h3>
              <select>
                <option>Select who can see this recipe</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="time">
              <div className="prep">
                <h3>Prep Time</h3>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="700"
                />
              </div>
              <div className="cook">
                <h3>Cook Time</h3>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="700"
                />
              </div>
              <div className="tim">
                <h3>Total Time</h3>
                <span className="minutes">Minutes</span>
              </div>
            </div>
            <div className="visibility">
              <h3>Categoriess</h3>


              {/* <DropDown options={menuList} /> */}
              {/* <-------------------------------------------------------------------------------------> */}
              {/* <Categoriess/> */}
              <div style={{
                display: 'block', width: 600, paddingLeft: 30, position: "relative", right: "31px"
              }}>
                <Cascader
                  style={{ width: 300 }}
                  placeholder="Select a recipe category"
                  data={DropDownList}
                />
              </div>

              {/* <-------------------------------------------------------------------------------------> */}


              <a href="#" className="add_cate">
                Add additional category
              </a>
            </div>
          </div>
          <div className="ingrediant">
            <h3>Ingredients</h3>
            {/* add integridient */}

            {addIngOpen && (
              <div className="add_ingredient">
                <input
                  type="text"
                  className="custom_input"
                  name="ingredient"
                  placeholder="Ingredient"
                  value={ingInfo.ingredient}
                  onChange={handleChange}
                />
                <div className="quantity">
                  <input
                    type="text"
                    className="custom_input"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingInfo.quantity}
                    onChange={handleChange}
                  />

                  <DropDown
                    handleChange={handleChange}
                    options={["Quantity Type", 1, 2, 3, 4]}
                    className="select_quantity"
                    value={ingInfo.qType}
                    name="qType"
                  />
                </div>
                <div className="btn">
                  {toggleItems ? (<button onClick={saveIngredient}>Save</button>)
                    :
                    (<button onClick={saveIngredient}>Update</button>)}
                  {/* <button onClick={saveIngredient}>Save</button> */}
                  <span className="add_cate" onClick={() => setAddIngOpen(false)}>
                    Cancel
                  </span>
                </div>
              </div>
            )}
            {/* after addition */}
            {arr?.map((val) => (
              <div key={val.id}>
                <div className="after_add">
                  <div className="content">
                    <p>{val.ingredient} {val.quantity} {val.qType}</p>

                    {/* {val.quantity} {val.ingredient} {val.qType} */}
                  </div>
                  <div className="action">
                    <a onClick={() => deleteArr(val.id)} href="#" className="delete">
                      <img src={del} />
                    </a>
                    <a onClick={() => editArr(val.id)} href="#" className="edit">
                      <img src={edit} />
                    </a>
                    <a href="#" className="shuffle">
                      <img src={sort} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <span className="add_cate" onClick={addIngredient}>
              Add Ingredients
            </span>
          </div>
          <div className="prepration">
            <h3>Preparation</h3>

            {/*after add step */}
            {preprationStep && (
              <div className="prepration-step">
                <h4>Step 1</h4>
                <textarea type="text"
                  value={pStepInfo}
                  onChange={(e) => setPStepInfo(e.target.value)}
                />
                {/* <input type="text" placeholder='Add items' value={pStepInfo} onChange={(e) => setPStepInfo(e.target.value)} /> */}

                <div className="btn">
                  {toggleItem ? <button onClick={savePrepration}>Save</button> :
                    <button onClick={savePrepration}>Update</button>}
                  <span className="add_cate" onClick={() => setPreprationStep(false)}>
                    Cancel
                  </span>
                </div>
              </div>
            )}
            {preArr?.map((res) => (
              <div className="prepration-step ">
                <h4>Step 1</h4>
                <div className="edit">
                  <p>{res.info}</p>
                  {/* <textarea>{res.info}</textarea> */}
                  <div className="action">
                    <a onClick={() => deletePreArr(res.id)} href="#" className="delete">
                      <img src={del} />
                    </a>
                    <a onClick={() => editPreArr(res.id)} href="#" className="edit">
                      <img src={edit} />
                    </a>
                    <a href="#" className="shuffle">
                      <img src={sort} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <span className="add_cate" onClick={handlePrepration}>
              Add Preparation Step
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRecipee;
