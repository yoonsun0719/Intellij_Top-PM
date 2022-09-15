// 주소창에서 현재 페이지를 가져온다.
const getNowPage = window.location.search.replace("?page=", "").replace("&max=10", "")

$(() => {
    // 현재 페이지를 페이지 입력 필드에 set
    $('#page-input').val(getNowPage)

    // 로그인 버튼 클릭 이벤트
    $('#login-btn').on('click', () => {

        login()
    })

    // 패스워드 입력 필드에서 엔터키 이벤트
    $('#pw-input').on('keyup',function(key){
        if(key.keyCode === 13) {
            login()
        }
    })

    // 페이지 입력 필드 클릭 이벤트
    $('#page-input').on('click', () => {
        // 입력 필드 value 초기화
        $('#page-input').val("")
    })

    // 페이지 조회 버튼 클릭 이벤트
    $('#page-btn').on('click', () => {

        paging()
    })

    // 페이지 입력 필드에서 엔터키 이벤트
    $("#page-input").on("keyup",function(key){

        if(key.keyCode === 13) {
            paging()
        }
    })
})

/**
 * 로그인 처리
 */
function login() {
    axios({
        method: 'post',
        url: '/admin/login',
        data: {id: $('#id-input').val(), pw: $('#pw-input').val()},
        dataType: 'json'
    }).then(res => {
        if (res.data === true) {
            location.href = "/admin/getData?page=1&max=10"
        } else {
            alert("아이디 또는 비밀번호를 확인해 주세요.")
        }
    })
}

/**
 * 페이징 처리
 */
function paging() {
    const getPageVal = Number($('#page-input').val())
    const maxPageVal = Number($('#maxPage').text())

    console.log(getPageVal, maxPageVal)

    if(getPageVal == NaN) {
        alert('숫자로 입력해주세요.')
        $('#page-input').val(getNowPage)
        return
    }

    if(getPageVal < 0 || getPageVal == "") {
        alert('0 이상의 숫자를 입력하세요.')
        $('#page-input').val(getNowPage)
        return
    }

    if(maxPageVal < getPageVal) {
        alert(`마지막 페이지는 ${maxPageVal} 입니다.`)
        $('#page-input').val(getNowPage)
        return
    }

    location.href = `/admin/getData?page=${$('#page-input').val()}&max=10`
}