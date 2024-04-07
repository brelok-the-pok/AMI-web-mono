import React, { useState } from "react";
import "./PlostSettingsModal.css"
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from "axios";

export const PlotSettingsModal = ({active, setActive, setImages}) => {
    const [minValue, setMinValue] = useState("0")
    const [maxValue, setMaxValue] = useState("100")
    const [column, setColumn] = useState("Pclass")
    const [catagoryColumn, setCategoryColumn] = useState(null)

    const [isDisabled, setIsDisabled] = useState(true);

    const handleCategoryChange = (event) => {
        setColumn(event.target.value)
    };

    const handleCategoryColumnChange = (event) => {
        setCategoryColumn(event.target.value)
    };

    const handleMinChange = (event) => {
        setMinValue(event.target.value)
    };

    const handleMaxChange = (event) => {
        setMaxValue(event.target.value)
    };

    const sendButtonClick = () => {
        axios.post(
            "http://127.0.0.1:8000/rest/plots/create-plots/",
            {
                "column": column,
                "catagor_column": catagoryColumn,
                "min_value": minValue,
                "max_value": maxValue,
            }
        ).then(
            (resp) => {
                setImages(resp.data)
            }
        )

    }


    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <form>
                    <div>Выберите по какой переменной строить график, границы изучения и числа отслеживаемых переменных</div>
                    <br/>
                    <FormControl className="modal_lines" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel >Колонка варьирования</InputLabel>
                        <Select
                            className="modal_lines"
                            labelId="columnSelec"
                            id="columnSelec"
                            value={column}
                            label="Колонка"
                            onChange={handleCategoryChange}
                        >
                          <MenuItem value={"Pclass"}>Pclass</MenuItem>
                          <MenuItem value={"Sex"}>Sex</MenuItem>
                          <MenuItem value={"Age"}>Age</MenuItem>
                          <MenuItem value={"SibSp"}>SibSp</MenuItem>
                          <MenuItem value={"Parch"}>Parch</MenuItem>
                          <MenuItem value={"Fare"}>Fare</MenuItem>
                          <MenuItem value={"Cabin"}>Cabin</MenuItem>
                          <MenuItem value={"Embarked"}>Embarked</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="modal_lines">
                        <Checkbox
                            {..."TEST"}
                            id="caregory"
                            name="caregory"
                            onChange={(e) => {
                                setIsDisabled(!e.target.checked)
                            }}
                        />
                        <label htmlFor="caregory">По категориям</label>
                    </div>

                    <FormControl className="modal_lines" sx={{ m: 1, minWidth: 120 }} disabled={isDisabled}>
                        <InputLabel>Категориальная колонка</InputLabel>
                        <Select
                            className="modal_lines"
                            labelId="catcolumnSelec"
                            id="catcolumnSelec"
                            label="Кат.Колонка"
                            onChange={handleCategoryColumnChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"Pclass"}>Pclass</MenuItem>
                            <MenuItem value={"Sex"}>Sex</MenuItem>
                            <MenuItem value={"Age"}>Age</MenuItem>
                            <MenuItem value={"SibSp"}>SibSp</MenuItem>
                            <MenuItem value={"Parch"}>Parch</MenuItem>
                            <MenuItem value={"Fare"}>Fare</MenuItem>
                            <MenuItem value={"Cabin"}>Cabin</MenuItem>
                            <MenuItem value={"Embarked"}>Embarked</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField type="number" value={minValue} label="Минимальное значение" onChange={handleMinChange}/>
                    <br/>
                    <br/>

                    <TextField type="number" value={maxValue}  label="Максимальное значение" onChange={handleMaxChange}/>

                    <br/>
                    <br/>

                    <Button variant="contained" onClick={sendButtonClick}>Contained</Button>


                </form>
            </div>
        </div>
    )
}

