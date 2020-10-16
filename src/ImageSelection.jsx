import { AppBar, Button, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import './ImageSelection.css';
import { findImagesListByWordAndMode } from './Resources/fakeDB';


export const ImageSelection = (props) => {
    const { sentence, mode, setShow } = props;
    const [value, setValue] = useState(0);
    const [image, setImage] = useState(0);
    const [output, setOutput] = useState(new Array(sentence.length));
    const [ready, setReady] = useState(false);
    const [finished, setFinished] = useState(false);

    const tabs = (sentence).split('').map(c =>
        <Tab label={c} />
    );

    const onPick = (image, index) => {
        const newOutput = [...output];
        newOutput[index] = image;
        setOutput(newOutput);
        if (value === sentence.length - 1) {
            setReady(true);
        } else {
            setValue(prev => prev + 1);
        }
    }

    const tabPanels = (sentence.split('').map((c, index) => {
        const imageList = findImagesListByWordAndMode(c, mode);
        if (imageList.length === 0) {
            return <div className={`tabs ${index === value ? 'show' : 'hide'}`} >
                无 可 选 择 图 片
            </div>
        }
        return <div className={`tabs ${index === value ? 'show' : 'hide'}`} >
            <ImagePicker images={imageList.map((image, i) => ({ src: image, value: i }))}
                onPick={(image) => onPick(image, index)}>
                <button type="button" onClick={() => console.log(image)}>OK</button>
            </ImagePicker>
        </div>


    }));

    const download = () => {
        const canvas = document.getElementById("output-canvas");
        const context = canvas.getContext('2d');
        canvas.height = 200;
        canvas.width = sentence.length * 200;
        output.forEach((image, index) => {
            console.log(image);
            var render = new Image(200, "auto");
            render.onload = () => {
                context.drawImage(render, 200 * index, 0, 200, 200);
            }
            render.src = image.src;
        });
        setFinished(true);

    }

    return (
        <div className="selection" >
            { !finished && <>
                <Tabs value={value} variant="scrollable" onChange={(e, value) => setValue(value)}>
                    {tabs}
                </Tabs>
                {
                    tabPanels
                }
                <div className="buttons">
                    <Button onClick={() => setShow(false)}> 返回 </Button>
                    <Button disabled={!ready} onClick={download}> 生成 </Button>
                </div>
            </>}
            <canvas id="output-canvas" />
            { finished &&
                <>
                    <h3> 右键保存为图片即可</h3>
                    <Button onClick={() => setShow(false)}> 返回 </Button>
                </>
            }
        </div >
    )
}