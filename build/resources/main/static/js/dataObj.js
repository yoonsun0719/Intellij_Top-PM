import {openPopup, confirmPopup, loadingPopup} from "./common.js";

$(() => {
    // SUB 1 ~ 3 페이지 데이터 로컬 스토리지에 저장
    $('.input-check').on('click', () => {

        // 페이지 번호 get
        const getPageNum = $('.page-num').val()

        // sub1 page
        const now_state = []

        // sub2 page
        const necessary_task = []

        // sub3 page
        const time = []

        $('.input-check:checked').each((i, value) => {
            if (getPageNum == 1) {
                now_state.push($(value).val())
                localStorage.setItem("now_state", JSON.stringify(now_state))
            }

            if (getPageNum == 2) {
                necessary_task.push($(value).val())
                localStorage.setItem("necessary_task", JSON.stringify(necessary_task))
            }

            if (getPageNum == 3) {
                time.push($(value).val())
                localStorage.setItem("time", JSON.stringify(time))
            }
           /* if (getPageNum == 3) {
                localStorage.setItem("time", $(value).val())
            }*/
        })
    })

    // 전송 버튼 클릭 이벤트 및 SUB4 페이지 데이터 로컬 스토리지에 저장 (서버에 데이터 전송)
    $('#final-next').on('click', () => {

        loadingPopup('전송 중입니다.')

        // keyUp 이벤트에서 누락된 데이터가 있을 수 있기 때문에 입력 필드에서 다시 데이터를 가져온다.
        localStorage.setItem("corporate_name", $('#co-name').val())
        localStorage.setItem("corporate_tel", $('#co-tel').val())
        localStorage.setItem("staff_name", $('#per-name').val())

        const param = {
            now_state : localStorage.getItem("now_state").replace("[","").replace("]",""),
            necessary_task : localStorage.getItem("necessary_task").replace("[","").replace("]",""),
            time : localStorage.getItem("time").replace("[","").replace("]",""),
            //time : localStorage.getItem("time"),
            corporate_name : localStorage.getItem("corporate_name"),
            corporate_tel : localStorage.getItem("corporate_tel"),
            staff_name : localStorage.getItem("staff_name"),
            title: `[All Side] ${$('#co-name').val()} 문의 내용입니다.`
        }

        axios({
            method: 'post',
            url: '/user/saveData',
            data: JSON.parse(JSON.stringify(param)),
            dataType: 'json',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            $('popupBlurArea').remove()
            if(res.data === 1) {
                localStorage.clear()
                openPopup("전송 완료", "24시간 이내로 연락드리겠습니다.")
            } else {
                openPopup("전송 실패 ", "관리자에게 문의하세요.")
            }
        })
    })
})

