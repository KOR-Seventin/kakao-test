import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
}));

const KakaoLink = () => {
  const classes = useStyles();

  useEffect(() => {
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    window.Kakao.init("f25c810cf3b7bd0ae000f90b7f5b5280");
  }, []);

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLink(""); // url to blank
  };

  const sendLink = (imageUrl) => {
    var url = "";
    if (imageUrl.length > 0) {
      url = imageUrl;
    }
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "",
        description: text,
        imageUrl: url,
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
    });

    // state 초기화
    setText("");
  };

  const clean = () => {
    setText("");
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <TextField
        id="outlined-full-width"
        label="메시지"
        style={{ margin: 8 }}
        placeholder="여기에 카톡 내용을 써 주세요"
        fullWidth
        autoFocus
        multiline
        rows="5"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={(e) => clean()}>
          다시 쓰기
        </Button>
        <span> </span>
        <Button
          variant="outlined"
          color="primary"
          id="kakao-link-btn"
          onClick={(e) => handleSubmit(e)}
        >
          카톡 전송
        </Button>
      </div>
    </Paper>
  );
};

export default KakaoLink;