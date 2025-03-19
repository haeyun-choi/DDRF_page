document.addEventListener("DOMContentLoaded", function() {
    const imagePairs = [
        { before: "./static/images/homelibrary_1_blur.png", after: "./static/images/homelibrary_1_ours_g.png", beforeLabel: "Blurry", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/blurrf_exblur.png", after: "./static/images/blurrf_ours_p.png", beforeLabel: "ExBluRF", afterLabel: "DeepDeblurRF-P (ours)" },
        { before: "./static/images/blurrf_dbgs.png", after: "./static/images/blurrf_ours_g.png", beforeLabel: "Deblurring-3DGS", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/cupcake_bags.png", after: "./static/images/cupcake_ours_g.png", beforeLabel: "BAGS", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/caps_pdrf.png", after: "./static/images/caps_ours_p.png", beforeLabel: "PDRF-10", afterLabel: "DeepDeblurRF-P (ours)" },
        { before: "./static/images/girl_dbgs.png", after: "./static/images/girl_ours_g.png", beforeLabel: "Deblurring-3DGS", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/deco_db.png", after: "./static/images/deco_ours_p.png", beforeLabel: "Deblur-NeRF", afterLabel: "DeepDeblurRF-P (ours)" },
        { before: "./static/images/basket_dbgs.png", after: "./static/images/basket_ours_g.png", beforeLabel: "Deblurring-3DGS", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/sb_bags.png", after: "./static/images/sb_ours_g.png", beforeLabel: "BAGS", afterLabel: "DeepDeblurRF-G (ours)" },
        { before: "./static/images/seal_dbgs.png", after: "./static/images/seal_ours_g.png", beforeLabel: "Deblurring-3DGS", afterLabel: "DeepDeblurRF-G (ours)" }
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
