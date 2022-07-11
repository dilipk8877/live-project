import React from 'react'
import 'rsuite/dist/rsuite.min.css';
import {Dropdown,ButtonToolbar } from 'rsuite';
const Categoriess = () => {
    return (
        <>
            <ButtonToolbar>
                <Dropdown title="Select a recipe category">
                    <Dropdown.Item>World Cuisine</Dropdown.Item>
                    <Dropdown.Item>Healthy Recipes</Dropdown.Item>
                    <Dropdown.Item>Dinner</Dropdown.Item>
                    <Dropdown.Item>Lunch</Dropdown.Item>
                    <Dropdown.Menu title="Breakfast">
                        <Dropdown.Menu title="Breakfast">
                            <Dropdown.Item>Burrito</Dropdown.Item>
                            <Dropdown.Item>Crepe</Dropdown.Item>
                            <Dropdown.Item>french Toast</Dropdown.Item>
                            <Dropdown.Item>Granola</Dropdown.Item>
                            <Dropdown.Item>Overnight Oat</Dropdown.Item>
                            <Dropdown.Item>Quiche</Dropdown.Item>
                        </Dropdown.Menu>
                        <Dropdown.Menu title="Casserole">
                            <Dropdown.Item>Egg</Dropdown.Item>
                            <Dropdown.Item>Frittata</Dropdown.Item>
                            <Dropdown.Item>Omlet</Dropdown.Item>
                            <Dropdown.Item>Pancake</Dropdown.Item>
                            <Dropdown.Item>Waffle</Dropdown.Item>
                            <Dropdown.Item>Quiche</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Menu>
                    <Dropdown.Item>Salads</Dropdown.Item>
                    <Dropdown.Item>Side Dishes</Dropdown.Item>
                    <Dropdown.Item>Soup</Dropdown.Item>
                    <Dropdown.Item>Stew & Chili Recipies</Dropdown.Item>
                    <Dropdown.Item>Appetizers & Snacks</Dropdown.Item>
                    <Dropdown.Item>Desserts</Dropdown.Item>
                </Dropdown>
            </ButtonToolbar>
        </>
    )
}

export default Categoriess;