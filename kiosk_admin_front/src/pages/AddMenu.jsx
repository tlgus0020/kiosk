


export function AddMenu(props){

    return(
        <div id="AddMenu">
            <div id="addBox">
                <div>
                <h2>메뉴추가</h2>                <button onClick={props.handle}>X</button>

                </div>
                <div>
                    메뉴명
                    <input></input> 
                </div>
                <div>
                    메뉴코드
                    <input></input> 
                </div>
                <button>등록</button>
            </div>
        </div>
    )
}