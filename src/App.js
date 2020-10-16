import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Button } from '@material-ui/core';
import { ImageSelection } from './ImageSelection';

function App() {
  const [sentence, setSentence] = useState("")
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('words');

  const getWordImage = (word) => {
    // 此处对DB api 进行搜索对应Word图片格式


  }

  const getBQBImage = (word) => {
    // 此处对API 进行表情包图片格式


  }

  const onClickWenzik = () => {
    if (sentence === "") {
      alert("请输入句子开始生成");
      return;
    }

    setMode('words');
    setShow(true);
  }

  const onClickMix = () => {
    if (sentence === "") {
      alert("请输入句子开始生成");
      return;
    }
    setMode('mix');
    setShow(true);
  }

  const _renderInput = () => {
    return <>
      <TextField
        label="输入文字开始生成"
        placeholder="目前仅支持: 我是猪"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)} />
      <div className="options">
        <Button variant="contained" onClick={onClickWenzik} >
          纯文字
      </Button>
        <Button variant="contained" onClick={onClickMix}>
          混合文字图片
      </Button>
      </div>
    </>
  }

  const children = show ? <ImageSelection setShow={setShow} mode={mode} show={show} sentence={sentence} /> : _renderInput();

  return (
    <div className={`App ${show ? "hide" : ""}`}>
      <h1>
        图片生成器
      </h1>
      {children}
    </div>
  );
}

export default App;
