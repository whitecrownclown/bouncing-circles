function getRandomBetween(start, end) {
  return start + Math.random() * (end - start);
}

function getRandomRGB() {
  const r = Math.floor(getRandomBetween(0, 255));
  const g = Math.floor(getRandomBetween(0, 255));
  const b = Math.floor(getRandomBetween(0, 255));

  return `rgb(${r}, ${g}, ${b})`;
}

function init() {
  var form = document.querySelector("form");
  var input = form.querySelector("input");
  var button = form.querySelector("button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var canvas = document.getElementById("renderer");
  var ctx = canvas.getContext("2d");

  let data = [];
  let animationRef;

  function generateData(count) {
    return Array.from({ length: count }).map(() => {
      const size = getRandomBetween(10, 40);

      return {
        x: getRandomBetween(size, canvas.width - size),
        y: getRandomBetween(size, canvas.height - size),
        size,
        color: getRandomRGB(),
        speed: getRandomBetween(2, 5),
        angle: {
          x: getRandomBetween(-1, 1),
          y: getRandomBetween(-1, 1),
        },
      };
    });
  }

  function checkBoundariesAndUpdateAngle(circle) {
    if (circle.x >= canvas.width - circle.size || circle.x <= circle.size) {
      circle.angle.x = -circle.angle.x;
    }

    if (circle.y >= canvas.height - circle.size || circle.y <= circle.size) {
      circle.angle.y = -circle.angle.y;
    }
  }

  function moveCircle(circle) {
    circle.x += circle.speed * circle.angle.x;
    circle.y += circle.speed * circle.angle.y;
  }

  function drawCircle(circle) {
    ctx.beginPath();

    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();

    ctx.closePath();
  }

  function draw() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    data.forEach((circle) => {
      checkBoundariesAndUpdateAngle(circle);
      moveCircle(circle);
      drawCircle(circle);
    });

    animationRef = window.requestAnimationFrame(draw);
  }

  button.addEventListener("click", () => {
    data = generateData(input.value);

    cancelAnimationFrame(animationRef);
    animationRef = window.requestAnimationFrame(draw);
  });
}

init();
