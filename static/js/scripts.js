document.addEventListener("DOMContentLoaded", function() {
    const imagePairs = [
        { before: "gaussian_compare_image/gs/00000.png", after: "gaussian_compare_image/hgs/00000.png", beforeLabel: "3D-GS", afterLabel: "Ours-P" },
        { before: "gaussian_compare_image/gs/00002.png", after: "gaussian_compare_image/hgs/00002.png", beforeLabel: "3D-GS", afterLabel: "Ours-P" },
        { before: "gaussian_compare_image/gs/00010.png", after: "gaussian_compare_image/hgs/00010.png", beforeLabel: "3D-GS", afterLabel: "Ours-P" },
        { before: "gaussian_compare_image/gs/00004.png", after: "gaussian_compare_image/hgs/00004.png", beforeLabel: "3D-GS", afterLabel: "Ours-P" },
        { before: "gaussian_compare_image/gs/00011.png", after: "gaussian_compare_image/hgs/00011.png", beforeLabel: "BAGS", afterLabel: "Ours-G" },
        { before: "gaussian_compare_image/gs/00029.png", after: "gaussian_compare_image/hgs/00029.png", beforeLabel: "BAGS", afterLabel: "Ours-G" },
        { before: "gaussian_compare_image/gs/00018.png", after: "gaussian_compare_image/hgs/00018.png", beforeLabel: "BAGS", afterLabel: "Ours-G" }
    ];

    const beforeImg = document.getElementById("before-img");
    const afterImg = document.getElementById("after-img");
    const beforeLabel = document.getElementById("label-left");
    const afterLabel = document.getElementById("label-right");
    const beforeContainer = document.querySelector(".before-img");
    const handler = document.querySelector(".handler");

    if (!beforeImg || !afterImg || !beforeContainer || !handler || !beforeLabel || !afterLabel) {
        console.error("❌ 필수 DOM 요소를 찾을 수 없습니다!");
        return;
    }

    // 버튼 클릭 시 이미지 및 라벨 변경
    document.querySelectorAll(".switch-btn").forEach(button => {
        button.addEventListener("click", function() {
            let index = parseInt(this.dataset.img);
            beforeImg.src = imagePairs[index].before;
            afterImg.src = imagePairs[index].after;

            // 라벨 업데이트
            beforeLabel.textContent = imagePairs[index].beforeLabel;
            afterLabel.textContent = imagePairs[index].afterLabel;

            // 슬라이더를 초기화 위치로 이동
            beforeContainer.style.width = "50%";
            handler.style.left = "50%";
        });
    });

    // 슬라이더 드래그 동작
    handler.addEventListener("mousedown", function (e) {
        e.preventDefault();  // 기본 드래그 동작 방지
        e.stopPropagation(); // 이벤트 버블링 방지

        let sliderWrap = document.querySelector(".slider-wrap-custom");
        let sliderRect = sliderWrap.getBoundingClientRect();
        let offsetX = e.clientX - handler.getBoundingClientRect().left;

        function moveHandler(e) {
            let newX = e.clientX - sliderRect.left - offsetX;
            let maxX = sliderRect.width;

            if (newX >= 0 && newX <= maxX) {
                handler.style.left = newX + 'px';
                beforeContainer.style.width = newX + 'px';
            }
        }

        function stopHandler() {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', stopHandler);
        }

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
    });
});
