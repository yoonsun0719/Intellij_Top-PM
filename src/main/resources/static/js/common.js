$(() => {

    // SUB1 페이지 저장된 데이터 체크 후 대입
    if(localStorage.getItem("now_state") !== null) {
        const getData = JSON.parse(localStorage.getItem("now_state"))
        for (const i in getData) {
            $(`input[value="${getData[i]}"]`).prop('checked',true)
        }
        selectDataCheck()
    }

    // SUB2 페이지 저장된 데이터 체크 후 대입
    if(localStorage.getItem("necessary_task") !== null) {
        const getData = JSON.parse(localStorage.getItem("necessary_task"))
        for (const i in getData) {
            $(`input[value="${getData[i]}"]`).prop('checked',true)
        }
        selectDataCheck()
    }

    /*// SUB3 페이지 저장된 데이터 체크 후 대입
    if(localStorage.getItem("time") !== null) {
        const getData = localStorage.getItem("time")
        $(`input[value="${getData}"]`).prop('checked',true)
        selectDataCheck()
    }*/

    // SUB3 페이지 저장된 데이터 체크 후 대입
    if(localStorage.getItem("time") !== null) {
        const getData = JSON.parse(localStorage.getItem("time"))
        for (const i in getData) {
            $(`input[value="${getData[i]}"]`).prop('checked',true)
        }
        selectDataCheck()
    }

    // SUB4 페이지 회사명 저장된 데이터 체크 후 대입
    if(localStorage.getItem("corporate_name") !== null) {
        $('#co-name').val(localStorage.getItem("corporate_name"))
        inputDataCheck()
    }

    // SUB4 페이지 전화번호 저장된 데이터 체크 후 대입
    if(localStorage.getItem("corporate_tel") !== null) {
        $('#co-tel').val(localStorage.getItem("corporate_tel"))
        inputDataCheck()
    }

    // SUB4 페이지 담당자 저장된 데이터 체크 후 대입
    if(localStorage.getItem("staff_name") !== null) {
        $('#per-name').val(localStorage.getItem("staff_name"))
        inputDataCheck()
    }


    // SUB 1 ~ 3 페이지 체크박스 클릭 이벤트
    $('.input-check').on('click', () => {

        selectDataCheck()
    })


    // SUB4 페이지 회사명 입력 필드, 키 이벤트
    $('#co-name').on('keyup', () => {
        localStorage.setItem("corporate_name", $('#co-name').val())
        inputDataCheck()
    })


    // SUB4 페이지 전화번호 입력 필드, 키 이벤트
    $('#co-tel').on('keyup', () => {
        localStorage.setItem("corporate_tel", $('#co-tel').val())
        inputDataCheck()
    })


    // SUB4 페이지 담당자 입력 필드, 키 이벤트
    $('#per-name').on('keyup', () => {
        localStorage.setItem("staff_name", $('#per-name').val())
        inputDataCheck()
    })

})

export {openPopup, confirmPopup, loadingPopup}

/**
 * SUB 1 ~ 3 페이지 체크 데이터를 확인 후, 다음 버튼을 활성화 / 비활성화 처리
 */
function selectDataCheck() {
    const dataCheck = $('.input-check:checked').length

    if (dataCheck > 0) {
        $('#next').attr('class', 'btn btn-fix active')
        $('#next').attr("disabled", false)
    } else {
        $('#next').attr('class', 'btn btn-fix')
        $('#next').attr("disabled", true)
    }
}

/**
 * SUB4 페이지 입력 필드 데이터 체크
 */
function inputDataCheck() {
    if ($('#co-name').val() != "" && $('#co-tel').val() != "" && $('#per-name').val() != "") {
        $('#final-next').attr('class', 'btn btn-fix active')
        $('#final-next').attr("disabled", false)
    } else {
        $('#final-next').attr('class', 'btn btn-fix')
        $('#final-next').attr("disabled", true)
    }
}

/**
 * alert 대체 공통 팝업
 *
 * @param getTitle = 팝업 타이틀
 * @param getMsg = 안내 메세지
 *
 * @use openPopup("Title", "Msg")
 */
const openPopup = (getTitle, getMsg) => {
    axios({
        method: 'post',
        url: '/openPopup',
        data: {title: getTitle, msg: getMsg},
        dataType: 'json'
    }).then(res => {
        $('body').append(res.data)
        $('.popupArea').hide().fadeIn(500)
    })
}

/**
 * confirm 대체 공통 팝업
 *
 * @param getTitle = 팝업 타이틀
 * @param getMsg = 안내 메세지
 * @param callback = 확인 버튼을 누르면 콜백 함수에서 return true 반환
 *
 * @use confirmPopup("공통팝업창", "팝업오픈", (res) => { if(res === true) {...} })
 */
const confirmPopup = (getTitle, getMsg, callback) => {
    axios({
        method: 'post',
        url: "/confirmPopup",
        data: {title: getTitle, msg: getMsg},
        dataType: 'json'
    }).then(res => {
        $('body').append(res.data)
        $('.popupArea').hide()
        $('.popupArea').fadeIn(500)

        $('.popupCheckBtn').on('click', () => {
            $('popupBlurArea').remove()
            callback(true)
        })
    })
    $('.popupArea').hide()
    $('.popupArea').fadeIn(500)
}

/**
 * 로딩 처리 팝업
 * @param getTitle = 타이틀 메시지
 *
 * @use loadingPopu('로딩중 입니다.')
 */
const loadingPopup = (getTitle) => {
    axios({
        method: 'post',
        url: '/loadingPopup',
        data: {title: getTitle},
        dataType: 'json'
    }).then(res => {
        $('body').append(res.data)
        $('.popupArea').hide().fadeIn(500)
    })
}
