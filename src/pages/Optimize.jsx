import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import Diversify from "../components/diversify"
import PortfolioTable from "../components/portfolioTable"
import BackTest from "../components/backtest"
import GenerateReport from "../util/report"

export default function Optimize() {

    const [investmentAmount, setInvestmentAmount] = useState(100000)
    const [duration, setDuration] = useState(1)

    const [diversifyPortfolio, setDiversifyPortfolio] = useState(false)

    const [sectors, setSectors] = useState([])

    const [selectedSectors, setSelectedSectors] = useState({})

    const [optimizedData, setOptimizedData] = useState({
        loading: false,
        data: null
    })

    const [optimizer, setOptimizer] = useState("efficient_frontier")

    const [riskCategory, setRiskCategory] = useState("Low risk")

    const [backtestData, setBacktestData] = useState({
        loading: false,
        data: null
    })

    const dialogRef = useRef()


    const optimize = async () => {
        if (investmentAmount === 0) {
            alert("Please enter the amount you want to invest")
            return
        }
        if (duration === 0) {
            alert("Please select a duration to invest")
            return
        }
        if (diversifyPortfolio) {
            // set sectors
        }
        setOptimizedData({
            ...optimizedData,
            loading: true
        })

        const sectorValues = {}

        for (const key in selectedSectors) {
            sectorValues[key] = selectedSectors[key] / 100
        }

        await fetch("http://localhost:8000/optimize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_category: riskCategory,
                invest_amount: investmentAmount,
                duration: duration * 30,
                sector_weights: sectorValues,
                optimizer: optimizer,
                index: "nifty500"
            })
        }).then(response => response.json())
            .then(data => {
                setOptimizedData({
                    loading: false,
                    data: data
                })
            })
            .catch(error => {
                console.error(error)
                setOptimizedData({
                    loading: false,
                    data: null
                })
            })
    }

    const backtest = async () => {
        setBacktestData({
            ...backtestData,
            loading: true
        })
        await fetch("http://localhost:8000/backtest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_category: riskCategory,
                invest_amount: investmentAmount,
                duration: duration * 30,
                invested: optimizedData.data.optimized_results.invested,
                weights: optimizedData.data.optimized_results.weights,
                start_date: optimizedData.data.start_date
            })
        }).then(response => response.json())
            .then(data => {
                setBacktestData({
                    loading: false,
                    data: data
                })
            })
            .catch(error => {
                console.error(error)
                setBacktestData({
                    loading: false,
                    data: null
                })
            })
    }



    const getSectors = async () => {
        await fetch("http://localhost:8000/sectors/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "index": "nifty500"
            })

        })
            .then(response => response.json())
            .then(data => {
                setSectors(data.sectors)
            })
            .catch(error => {
                console.error(error)
            })
    }



    useEffect(() => {
        const question = document.querySelector("#question")
        const span = dialogRef.current
        question.addEventListener("mouseover", () => {
            span.style.left = question.parentElement.offsetLeft + question.parentElement.offsetWidth + "px"
            span.style.top = question.parentElement.offsetTop + "px"
            span.hidden = false
        })
        question.addEventListener("mouseout", () => {
            span.hidden = true
        })
        const risk = JSON.parse(localStorage.getItem('risk_score'))

        if (risk) {
            setRiskCategory(risk.risk_category)
        }


        getSectors()

        return () => {
            question.removeEventListener("mouseover", () => {
                span.hidden = false
            })
            question.removeEventListener("mouseout", () => {
                span.hidden = true
            })
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 animate-gradient-x relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12 animate-fade-in">
                    Portfolio Optimization
                </h1>

                <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/30 shadow-xl rounded-2xl p-8 space-y-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-white/10">
                    {/* Investment Amount Input */}
                    <div className="form-control transition-all duration-300">
                        <label className="label mb-2">
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Investment Amount
                            </span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20" 
                            value={investmentAmount} 
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder="Enter amount to invest"
                        />
                    </div>

                    {/* Duration Select */}
                    <div className="form-control transition-all duration-300">
                        <label className="label mb-2">
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Investment Duration
                            </span>
                        </label>
                        <select 
                            className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <option value={1}>1 month</option>
                            <option value={2}>2 months</option>
                            <option value={6}>6 months</option>
                            <option value={12}>12 months</option>
                            <option value={18}>18 months</option>
                            <option value={24}>24 months</option>
                        </select>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                            {duration === 0 
                                ? "Select a duration to invest" 
                                : `Investment end date: ${new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000).toDateString()}`
                            }
                        </p>
                    </div>

                    {/* Risk Category and Optimizer in same row */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-control transition-all duration-300">
                            <label className="label mb-2">
                                <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    Risk Category
                                </span>
                            </label>
                            <select 
                                className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                                value={riskCategory} 
                                onChange={(e) => setRiskCategory(e.target.value)}
                            >
                                <option value="Low risk">Low risk</option>
                                <option value="Moderate risk">Moderate risk</option>
                                <option value="High risk">High risk</option>
                                <option value="Very high risk">Very high risk</option>
                            </select>
                        </div>

                        <div className="form-control transition-all duration-300">
                            <label className="label mb-2">
                                <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    Optimization Method
                                </span>
                            </label>
                            <select 
                                className="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                                value={optimizer} 
                                onChange={(e) => setOptimizer(e.target.value)}
                            >
                                <option value="efficient_frontier">Efficient Frontier</option>
                                <option value="black_litterman">Black Litterman</option>
                                <option value="monte_carlo">Monte Carlo</option>
                            </select>
                        </div>
                    </div>

                    {/* Diversify Toggle */}
                    <div className="form-control transition-all duration-300 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600/20 hover:shadow-md">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary transition-all duration-300 hover:scale-105" 
                                checked={diversifyPortfolio}
                                onChange={(e) => setDiversifyPortfolio(e.target.checked)} 
                            />
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                Diversify Portfolio
                            </span>
                            <div className="relative transition-transform duration-300 hover:scale-110">
                                <svg id="question" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 512 512">
                                    <path fillRule="nonzero" d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-21.49 301.51v-2.03c.16-13.46 1.48-24.12 4.07-32.05 2.54-7.92 6.19-14.37 10.97-19.25 4.77-4.92 10.51-9.39 17.22-13.46 4.31-2.74 8.22-5.78 11.68-9.18 3.45-3.36 6.19-7.27 8.23-11.69 2.02-4.37 3.04-9.24 3.04-14.62 0-6.4-1.52-11.94-4.57-16.66-3-4.68-7.06-8.28-12.04-10.87-5.03-2.54-10.61-3.81-16.76-3.81-5.53 0-10.81 1.11-15.89 3.45-5.03 2.29-9.25 5.89-12.55 10.77-3.3 4.87-5.23 11.12-5.74 18.74h-32.91c.51-12.95 3.81-23.92 9.85-32.91 6.1-8.99 14.13-15.8 24.08-20.42 10.01-4.62 21.08-6.9 33.16-6.9 13.31 0 24.89 2.43 34.84 7.41 9.96 4.93 17.73 11.83 23.27 20.67 5.48 8.84 8.28 19.1 8.28 30.88 0 8.08-1.27 15.34-3.81 21.79-2.54 6.45-6.1 12.24-10.77 17.27-4.68 5.08-10.21 9.54-16.71 13.41-6.15 3.86-11.12 7.82-14.88 11.93-3.81 4.11-6.56 8.99-8.28 14.58-1.73 5.63-2.69 12.59-2.84 20.92v2.03h-30.94zm16.36 65.82c-5.94-.04-11.02-2.13-15.29-6.35-4.26-4.21-6.35-9.34-6.35-15.33 0-5.89 2.09-10.97 6.35-15.19 4.27-4.21 9.35-6.35 15.29-6.35 5.84 0 10.92 2.14 15.18 6.35 4.32 4.22 6.45 9.3 6.45 15.19 0 3.96-1.01 7.62-2.99 10.87-1.98 3.3-4.57 5.94-7.82 7.87-3.25 1.93-6.86 2.9-10.82 2.94z"/>
                                </svg>
                            </div>
                        </label>
                    </div>

                    {/* Diversify Component with animation */}
                    {diversifyPortfolio && (
                        <div className="animate-fade-in-up p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-600/20 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 animate-fade-in">
                                    Sector Allocation
                                </h3>
                                <div className="grid gap-4 animate-fade-in-up delay-100">
                                    <Diversify 
                                        sectors={sectors} 
                                        selectedSectors={selectedSectors} 
                                        setSelectedSectors={setSelectedSectors} 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center pt-6">
                        <button 
                            className="btn btn-primary w-48 font-semibold text-white text-lg h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 border-0 shadow-lg hover:shadow-xl"
                            onClick={optimize}
                            disabled={optimizedData.loading}
                        >
                            {optimizedData.loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : 'Optimize'}
                        </button>
                    </div>

                    {/* Results Section */}
                    {optimizedData.data && (
                        <div className="mt-8 space-y-6 animate-fade-in">
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600/20">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    Start Date
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">{optimizedData.data.start_date}</p>
                            </div>
                            
                            <div className="w-full overflow-x-auto">
                                <PortfolioTable optimizedData={optimizedData} />
                            </div>
                            
                            <div className="flex justify-center">
                                <button 
                                    className="btn w-48 font-semibold text-white text-lg h-12 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 border-0 shadow-lg hover:shadow-xl"
                                    onClick={backtest}
                                    disabled={backtestData.loading}
                                >
                                    {backtestData.loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : 'Backtest'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Backtest Results */}
                    {backtestData.data && (
                        <div className="mt-8 space-y-6 animate-fade-in w-full">
                            <div className="w-full overflow-x-auto">
                                <BackTest backtestData={backtestData.data} />
                            </div>
                            
                            <div className="flex justify-center">
                                <button 
                                    className="btn w-48 font-semibold text-white text-lg h-12 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 border-0 shadow-lg hover:shadow-xl"
                                    onClick={() => GenerateReport(optimizedData.data, backtestData.data)}
                                >
                                    Download Report
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}