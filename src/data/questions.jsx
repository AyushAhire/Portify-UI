export const questions = {
   1: {
      "question": "Are you willing to invest in a high-risk, high-return investment with the potential for significant fluctuations in value?",
      "options": ["Yes", "No", "Unsure"],
      "values": [3, 1, 2]
   },
   2: {
      "question": "How comfortable are you with the idea of potentially losing a significant portion of your investment in exchange for the possibility of higher returns?",
      "options": ["Very comfortable", "Somewhat comfortable", "Not comfortable"],
      "values": [3, 2, 1]
   },
   3: {
      "question": "What is your primary investment goal?",
      "options": ["Aggressive growth", "Balanced growth", "Capital preservation"],
      "values": [3, 2, 1]
   },
   4: {
      "question": "How would you react if your investment portfolio lost 20% of its value in one month?",
      "options": ["Buy more", "Hold steady", "Sell everything"],
      "values": [3, 2, 1]
   },
   5: {
      "question": "How long do you plan to keep your money invested?",
      "options": ["More than 10 years", "5-10 years", "Less than 5 years"],
      "values": [3, 2, 1]
   },
   6: {
      "question": "How would you describe your investment knowledge and experience?",
      "options": ["Very experienced", "Somewhat experienced", "Novice"],
      "values": [3, 2, 1]
   },
   7: {
      "question": "What percentage of your total savings are you planning to invest?",
      "options": ["More than 75%", "25-75%", "Less than 25%"],
      "values": [3, 2, 1]
   },
   8: {
      "question": "How often do you plan to monitor and adjust your investments?",
      "options": ["Daily/Weekly", "Monthly", "Yearly or less"],
      "values": [3, 2, 1]
   },
   9: {
      "question": "What is your current financial situation?",
      "options": ["Very stable", "Somewhat stable", "Unstable"],
      "values": [3, 2, 1]
   },
   10: {
      "question": "How would you respond to sudden market volatility?",
      "options": ["See it as an opportunity", "Wait it out", "Get very concerned"],
      "values": [3, 2, 1]
   }
}

export function calculate_risk_score(answers) {
   let risk_score = 0
   for (const question in questions) {
      const value = questions[question]["values"][answers[question] - 1]
      risk_score += value
   }
   return risk_score
}

export function calculate_risk_category(risk_score) {
   if (risk_score >= 10 && risk_score <= 14)
      return "Low risk"
   else if (risk_score >= 15 && risk_score <= 19)
      return "Moderate risk"
   else if (risk_score >= 20 && risk_score <= 24)
      return "High risk"
   else if (risk_score >= 25 && risk_score <= 30)
      return "Very high risk"
   else
      return "Invalid risk score"
}