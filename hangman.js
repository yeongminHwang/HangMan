const WORDS = ["apple", "banana", "orange", "pineapple"];

const startHangMan = () => {
  const word_index = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[word_index];

  const content_container =
    document.getElementsByClassName("content_container")[0];
  const hidden_word_container = document.createElement("div");

  // HangMan word -> "*"로 생성
  const hidden_word = hideWord(word);

  hidden_word_container.appendChild(hidden_word);
  content_container.appendChild(hidden_word);

  // 게임 시작 후, 시작버튼 hide
  const start_btn = document.getElementById("start_btn");
  content_container.removeChild(start_btn);

  // 게임 시작 후, 게임 life 설정
  const living_count_container = document.getElementsByClassName(
    "living_count_container"
  )[0];
  const HP_container = document.createElement("div");
  const HP = getHpByWord(word);
  const HP_form = document.createTextNode("HP : " + HP);
  HP_container.appendChild(HP_form);
  HP_container.classList.add(HP);
  living_count_container.appendChild(HP_container);
};

// HangMan word -> "*"로 생성
const hideWord = (word) => {
  const hidden_word = document.createElement("div");
  hidden_word.classList.add("hidden_word_container");
  for (var i = 0; i < word.length; i++) {
    const div = document.createElement("div");
    const char = word[i];
    let ch = document.createTextNode("*");

    if (char === " ") {
      div.classList.add("space");
      ch = document.createTextNode(" ");
    } else {
      div.classList.add(char);
    }
    div.appendChild(ch);
    hidden_word.appendChild(div);
  }

  // 키입력 이벤트 등록
  window.addEventListener("keydown", (e) => {
    keypressEvent(e);
  });

  return hidden_word;
};

// 키입력 이벤트 함수
const keypressEvent = (e) => {
  const keys = document.getElementsByClassName(e.key);
  const living_count_container = document.getElementsByClassName(
    "living_count_container"
  )[0];

  const HP_container = living_count_container.children[0];
  const HP = HP_container.classList[0];
  const hidden_word_container = document.getElementsByClassName(
    "hidden_word_container"
  )[0];
  const hidden_word = hidden_word_container.children;

  var isAllPressed = true;

  for (var i = 0; i < hidden_word.length; i++) {
    if (hidden_word[i].classList[0] !== "pressed") {
      isAllPressed = false;
    }
  }
  // 모든 정답을 입력했을 경우
  if (isAllPressed) {
    alert("정답입니다.");

    const reset_btn = createReset_Btn();

    if (!document.getElementById("reset_btn")) {
      living_count_container.appendChild(reset_btn);
    }
  } else {
    // 정답인 알파벳을 눌렀을 때
    if (keys.length > 0) {
      Array.from(keys).map((key) => {
        key.className = "pressed";
        key.innerHTML = e.key;
      });
    } else {
      // 오답인 알파벳을 눌렀을 때

      // Life가 남아있는 경우
      if (HP > 0) {
        HP_container.classList.replace(HP, HP - 1);

        HP_container.innerHTML = "";
        const HP_form = document.createTextNode(
          "HP : " + HP_container.classList[0]
        );
        HP_container.appendChild(HP_form);
      } else {
        // Life가 Zero인 경우
        for (var i = 0; i < hidden_word.length; i++) {
          hidden_word[i].innerHTML = hidden_word[i].classList[0];
        }

        const reset_btn = createReset_Btn();

        if (!document.getElementById("reset_btn")) {
          living_count_container.appendChild(reset_btn);
        }
      }
    }
  }
};
// 단어 길이를 이용해서 게임 life 설정
const getHpByWord = (word) => {
  const HP = Math.floor(word.length * 0.6);
  return HP;
};

// 다시하기 버튼 생성
const createReset_Btn = () => {
  const reset_btn = document.createElement("button");
  const reset = document.createTextNode("다시하기");
  reset_btn.appendChild(reset);
  reset_btn.id = "reset_btn";

  reset_btn.addEventListener("click", (e) => {
    location.reload();
  });
  return reset_btn;
};

// 시작하기 버튼 생성
const createStart_Btn = () => {
  const start_btn = document.createElement("button");
  const start = document.createTextNode("Start");
  start_btn.appendChild(start);
  start_btn.id = "start_btn";
  start_btn.addEventListener("click", startHangMan);

  return start_btn;
};
