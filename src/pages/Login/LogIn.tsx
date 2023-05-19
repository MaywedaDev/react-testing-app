import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LogIn: React.FC<{initUser: any}> = ({initUser}) => {

    const [pokemons, setPokemons] = useState<any>([])

    const handleFetching = () => {
        if(window.scrollY >= (document.documentElement.offsetHeight - window.innerHeight) - 100){
            handleScroll()
        }      
    }

    const handleScroll = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20").then((data) => data.json())
                .then((pokes) => {
                    console.log(pokes)
                    setPokemons((prev: any) => {
                        if(prev){
                            return [...prev, ...pokes.results]
                        }
                        else{
                            return pokes.results
                        }
                    })   
                }).catch((err) => {
                    console.log(err.message)
        })
    }

 
    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleFetching)

        return () => window.removeEventListener('scroll',handleFetching)


    
    }, [])

    return (<>
            <ul>
            {pokemons && pokemons.length > 0 && pokemons.map((poke: any, i: number) => (
                <li style={{ margin: 6}} key={i}>
                 <div>
                    <p>
                 { poke.name }</p>
                 </div>

                 </li>
            ))}
            </ul>
        </>)
    // const history = useHistory()

    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const [user, setUser] = useState<{name: string}>()
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)

    // async function handleClick(){
    //     setError(false)
    //     setLoading(true)
    // try{
    //     const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/1')
    //     console.log(data)
    //     setUser(data)
    //     setLoading(false)
    //     setTimeout(() => {
    //         history.push('/game')
    //     }, 1500)
    // }
    // catch(err: any){
    //     setLoading(false)
    //     console.log(err.message)
    //     setError(true)
    // }
    // }

    // useEffect(() => {
    //     if(initUser){
    //         initUser(user?.name || 'The Unknown')
    //     }
    // }, [user])

    

    // return (  <div className="min-vh-100 d-flex justify-content-center align-items-center">
    //     <div className="w-100 border border-secondary-subtle rounded-4 p-4" style={{maxWidth: '500px'}}>
    //         {user && <p className="text-center">Your Random username: <span className="text-primary fw-bold fs-4">{user.name}</span></p>}
    //         <h1 className="text-center mb-5" data-testid="login">Log In To play TicTacToe</h1>
    //         <div className="w-100 d-flex flex-column mb-3">
    //             <label htmlFor="" className="mb-2" style={{fontSize: '14px'}}>Email</label>
    //             <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control py-3"  placeholder="Your Email"/>
    //         </div>

    //         <div className="w-100 d-flex flex-column mb-3">
    //             <label htmlFor="" className="mb-2" style={{fontSize: '14px'}}>Password</label>
    //             <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form-control py-3"  placeholder="Your Password"/>
    //         </div>

    //         <button disabled={!email || !password || loading} onClick={handleClick} className="btn btn-primary w-100 py-3">
    //             {loading ? 'Please wait...': 'Log In'}
    //         </button>
    //          <p style={{visibility: error ? 'visible': 'hidden'}} className="fs-5 text-danger text-center fw-semibold" data-testid='error'>Something went wrong</p>
    //     </div>
    // </div>  );
}
 
export default LogIn;