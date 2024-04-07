import './App.css';
import React, {useState} from "react";
import {PlotSettingsModal} from "./PlotSettingsModal"
import {ImageModal} from "./ImageModal"

function App() {
    const [modalActive, setModalActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [images, setImages] = useState([]);


    const handleChange = async (event) => {
        setSelectedFile(event.target.files[0])
        if (event.target.files[0]) {

            const formData = new FormData()
            formData.append('file', event.target.files[0])
            const res = await fetch(
                "http://127.0.0.1:8000/rest/loader/load-mono/",
                {method: 'POST', body: formData}
            )
            const data = await res.json()

            alert(data)

        }
    };

    return (
        <div className="App">
            <div className="main_block">
                <div className="load_div">
                    <input type="file" onChange={handleChange} />
                </div>

                <br/>
                <div>
                    <ImageModal images={images}/>
                </div>
                <br/>
                <div className={"popup_button"}>
                    <button onClick={() => {setModalActive(true)}} className="popup_button">Построить графики</button>
                </div>


            </div>

            <PlotSettingsModal active={modalActive} setActive={setModalActive} setImages={setImages}/>

        </div>
    )
}


export default App;
