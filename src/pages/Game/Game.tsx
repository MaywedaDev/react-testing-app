import './game.css'
import { useState, useEffect } from 'react';

const Game: React.FC<{user: string}> = ({user}) => {
    const [cells, setCells] = useState(['', '', '', '', '', '', '', '', ''])
    const [go, setGo] = useState('circle')
    const [winningMessage, setWinningMessage] = useState('')
    const message = 'It is now ' + go + "'s turn"

    const checkScore = () => {
        const combos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]

        combos.forEach(array => {
            let circleWins = array.every(cell => cells[cell] === 'circle')
            let crossWins = array.every(cell => cells[cell] === 'cross')

            if (circleWins){
                setWinningMessage('Circle Wins!')
                return
            }

            if (crossWins){
                setWinningMessage('Cross Wins!')
                return
            }

            if(cells.every(cell => cell == 'circle' || cell == 'cross')){
                setWinningMessage('NO Wins!, Game Over')
            }
        })

        
    }

    useEffect(() => {
        // console.log(cells)
        checkScore()
    }, [cells])
    return ( 
    <div className='min-vh-100 d-flex flex-column justify-content-center align-items-center'>
        <p className='mb-4' >UserName: <span data-testid="user">{user}</span></p>
        <div id="gameboard" className="border border-secondary rounded-4 overflow-hidden" data-testid='game'>
            {cells.map((cell, i, arr) => (
                <Cell id={i} 
                    cell={cell} 
                    key={i}
                    setCells={setCells}
                    go={go}
                    setGo={setGo}
                    cells={arr}
                    winningMessage={winningMessage}
                />
            ))}
        </div>
        <p className={` ${winningMessage ? 'text-success fw-bold fs-2': 'fs-4'} mt-2`}>{winningMessage || message}</p>
    </div>
     );
}

const Cell: React.FC<{id: number, cell: string, setCells: Function, go: string, setGo: Function, cells: string[], winningMessage: string}> = ({id, cell, setCells, go, setGo, cells, winningMessage}) => {

    const handleClick = (e: React.SyntheticEvent) => {
        const square = e.target as HTMLElement
        const firstChild = square.firstChild as HTMLElement

        if(!winningMessage){
            const taken = firstChild.classList.contains('circle') || firstChild.classList.contains('cross')
                if(!taken){
                    if(go === 'circle'){
                        firstChild.classList.add('circle')
                        setGo('cross')
                        handleCellChange('circle')
                    }
                    if(go === 'cross'){
                        firstChild.classList.add('cross')
                        setGo('circle')
                        handleCellChange('cross')
                    }
                }
            }
        }

        

        const handleCellChange = (className: string) => {
            const currcells = cells.map((cell, index) => {
                if(index === id){
                    return className
                }else{
                    return cell
                }
            })

            setCells(currcells)

        }

    
    return (<div id={`${id}`} data-testid='parentCell'  onClick={handleClick} className='square border border-secondary-subtle d-flex p-4 juistify-content-center align-items-center'>
        <div className={cell} data-testid="cell"></div>
    </div>)
}
 
export default Game;