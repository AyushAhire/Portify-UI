import { useEffect, useState } from 'react'
import { questions, calculate_risk_score, calculate_risk_category } from '../data/questions'
import { Link, useNavigate } from 'react-router-dom'


export default function UserForm() {

    const navigate = useNavigate()

    const [answers, setAnswers] = useState({
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1
    })

    const [risk_score, setRiskScore] = useState({
        risk_score: 0,
        risk_category: ""
    })


    useEffect(() => {
        const risk_score = calculate_risk_score(answers)
        const risk_category = calculate_risk_category(risk_score)
        setRiskScore({ risk_score: risk_score, risk_category: risk_category })
    }, [])

    function handleSubmit(e) {
        setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) })
        const risk_score = calculate_risk_score(answers)
        const risk_category = calculate_risk_category(risk_score)
        setRiskScore({ risk_score: risk_score, risk_category: risk_category })
    }

    const optimizePage = () => {
        localStorage.setItem('risk_score', JSON.stringify(risk_score))
        navigate('/optimize')
    }


    return (
        <>
            <div className='px-2 my-4'>
                <div className='px-4 text-center'>
                    <h1 className="text-3xl font-bold mb-4">Investment Risk Assessment</h1>
                    <p className="text-lg mb-4">Please answer the following questions to assess your risk tolerance.</p>
                </div>
                <div className='p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            Object.keys(questions).map((index) => {
                                return (
                                    <div key={index} className="backdrop-blur-sm bg-base-300/50 p-4 rounded-xl shadow-lg border border-opacity-20 hover:scale-[1.01] transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-base-300/60">
                                        <h2 className="text-lg font-bold mb-2">{questions[index]["question"]}</h2>
                                        <div className=''>
                                            {
                                                questions[index]["options"].map((option, option_index) => {
                                                    return (
                                                        <div key={option_index} className="mb-2 flex items-center gap-3">
                                                            <div className="relative flex-shrink-0">
                                                                <input 
                                                                    type="radio" 
                                                                    id={`${index}_${option_index}`} 
                                                                    name={index} 
                                                                    value={option_index + 1} 
                                                                    checked={answers[index] == option_index + 1}
                                                                    onChange={handleSubmit}
                                                                    className="appearance-none w-4 h-4 border-2 border-purple-400 rounded-full transition-all duration-300 
                                                                    checked:border-purple-500 checked:bg-purple-500 
                                                                    hover:border-purple-600 cursor-pointer relative
                                                                    before:content-[''] before:absolute before:w-full before:h-full before:rounded-full
                                                                    checked:before:animate-ping before:bg-purple-400 before:opacity-75 before:scale-0
                                                                    checked:before:scale-75"
                                                                />
                                                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                                                    w-1.5 h-1.5 rounded-full bg-white transform transition-all duration-300
                                                                    ${answers[index] == option_index + 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                                                </div>
                                                            </div>
                                                            <label htmlFor={`${index}_${option_index}`} 
                                                                className="cursor-pointer hover:text-purple-500 transition-colors duration-300 flex-1">
                                                                {option}
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <div className={`text-center mb-6 backdrop-blur-md p-8 rounded-xl shadow-lg border border-opacity-20
                            ${risk_score.risk_category.toLowerCase().includes('very high')
                                ? 'bg-red-500/20 border-red-400 shadow-red-500/20'
                                : risk_score.risk_category.toLowerCase().includes('high')
                                    ? 'bg-orange-500/20 border-orange-400 shadow-orange-500/20'
                                    : risk_score.risk_category.toLowerCase().includes('moderate')
                                        ? 'bg-yellow-500/20 border-yellow-400 shadow-yellow-500/20'
                                        : 'bg-green-500/20 border-green-400 shadow-green-500/20'
                            }`}>
                            <h2 className={`text-2xl font-bold mb-3 
                                ${risk_score.risk_category.toLowerCase().includes('very high')
                                    ? 'text-red-400'
                                    : risk_score.risk_category.toLowerCase().includes('high')
                                        ? 'text-orange-400'
                                        : risk_score.risk_category.toLowerCase().includes('moderate')
                                            ? 'text-yellow-400'
                                            : 'text-green-400'
                                }`}>Risk Score</h2>
                            <p className="text-lg mb-2">Your risk score is: 
                                <span className={`font-bold ml-2
                                    ${risk_score.risk_category.toLowerCase().includes('very high')
                                        ? 'text-red-400'
                                        : risk_score.risk_category.toLowerCase().includes('high')
                                            ? 'text-orange-400'
                                            : risk_score.risk_category.toLowerCase().includes('moderate')
                                                ? 'text-yellow-400'
                                                : 'text-green-400'
                                    }`}>
                                    {risk_score.risk_score}
                                </span>
                            </p>
                            <p className="text-lg">Your risk category is: 
                                <span className={`font-bold ml-2
                                    ${risk_score.risk_category.toLowerCase().includes('very high')
                                        ? 'text-red-400'
                                        : risk_score.risk_category.toLowerCase().includes('high')
                                            ? 'text-orange-400'
                                            : risk_score.risk_category.toLowerCase().includes('moderate')
                                                ? 'text-yellow-400'
                                                : 'text-green-400'
                                    }`}>
                                    {risk_score.risk_category}
                                </span>
                            </p>
                        </div>

                        <button 
                            className={`font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 
                            backdrop-blur-md shadow-lg border border-opacity-20
                            ${risk_score.risk_category.toLowerCase().includes('high')
                                ? 'bg-red-500/20 hover:bg-red-500/30 border-red-400 text-red-400'
                                : risk_score.risk_category.toLowerCase().includes('medium')
                                    ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400 text-yellow-400'
                                    : 'bg-green-500/20 hover:bg-green-500/30 border-green-400 text-green-400'
                            }`}
                            onClick={optimizePage}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}