const quizQuestions = [
    {
      question: "How comfortable are you with learning new technologies?",
      answers: {
        a: "Very uncomfortable - I avoid new technology",
        b: "Somewhat uncomfortable - I prefer familiar tools",
        c: "Neutral - I can adapt when necessary",
        d: "Comfortable - I enjoy learning new tools",
        e: "Very comfortable - I actively seek out new technology"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How do you feel about AI potentially changing aspects of your job?",
      answers: {
        a: "Very concerned - I worry about job security",
        b: "Somewhat concerned - I prefer things to stay the same",
        c: "Neutral - I'll wait and see what happens",
        d: "Optimistic - I see potential benefits",
        e: "Very excited - I welcome AI integration"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How would you rate your current understanding of AI capabilities?",
      answers: {
        a: "Very limited - I don't understand AI at all",
        b: "Basic - I know it exists but not much more",
        c: "Moderate - I understand some applications",
        d: "Good - I understand most common uses",
        e: "Excellent - I'm well-versed in AI capabilities"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How often do you experiment with new tools or methods in your work?",
      answers: {
        a: "Never - I stick to proven methods",
        b: "Rarely - Only when required",
        c: "Sometimes - When I see potential benefits",
        d: "Often - I regularly try new approaches",
        e: "Always - I constantly experiment and innovate"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How confident are you in your ability to learn AI tools?",
      answers: {
        a: "Not confident at all - I doubt I could learn",
        b: "Somewhat unconfident - I struggle with new tools",
        c: "Moderately confident - I can learn with support",
        d: "Confident - I'm good at learning new tools",
        e: "Very confident - I excel at learning new technology"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How do you typically respond when faced with workplace changes?",
      answers: {
        a: "Resist strongly - I prefer the status quo",
        b: "Resist initially - I need time to adjust",
        c: "Accept reluctantly - I go along with it",
        d: "Embrace with caution - I see potential benefits",
        e: "Embrace enthusiastically - I welcome change"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How well do you understand how AI might benefit your specific role?",
      answers: {
        a: "Not at all - I don't see any benefits",
        b: "Minimally - I see few potential benefits",
        c: "Somewhat - I can imagine some applications",
        d: "Well - I understand many potential benefits",
        e: "Very well - I can identify numerous opportunities"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How comfortable are you with potential changes to your workflow?",
      answers: {
        a: "Very uncomfortable - I prefer my current routine",
        b: "Somewhat uncomfortable - Change disrupts my efficiency",
        c: "Neutral - I can adapt if needed",
        d: "Comfortable - I'm flexible with my workflow",
        e: "Very comfortable - I enjoy optimizing my processes"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How willing are you to share feedback about AI implementation?",
      answers: {
        a: "Not willing - I prefer to stay quiet",
        b: "Somewhat unwilling - I'll share if asked directly",
        c: "Neutral - I'll provide feedback when appropriate",
        d: "Willing - I actively share my thoughts",
        e: "Very willing - I proactively provide detailed feedback"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    },
    {
      question: "How confident are you that AI will enhance rather than threaten your job?",
      answers: {
        a: "Not confident - I worry about job replacement",
        b: "Somewhat unconfident - I have concerns",
        c: "Neutral - I'm uncertain about the impact",
        d: "Confident - I believe AI will be beneficial",
        e: "Very confident - I'm excited about AI collaboration"
      },
      points: { a: 1, b: 2, c: 3, d: 4, e: 5 }
    }
  ];
  
  // Check if running in iframe
  function isInIframe() {
    try {
      return window !== window.top;
    } catch (e) {
      return true;
    }
  }
  
  // Adjust iframe height for better embedding
  function adjustIframeHeight() {
    if (isInIframe()) {
      const height = document.body.scrollHeight;
      window.parent.postMessage({
        type: 'resize',
        height: height
      }, '*');
    }
  }
  
  function updateProgress() {
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const total = quizQuestions.length;
    const progress = (answered / total) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.progress-text').textContent = `${Math.round(progress)}% Complete`;
    
    // Adjust iframe height when progress updates
    setTimeout(adjustIframeHeight, 100);
  }
  
  function buildQuiz() {
    const quizContainer = document.getElementById("quiz");
    const output = [];
  
    quizQuestions.forEach((q, index) => {
      const answers = [];
      for (const key in q.answers) {
        answers.push(
          `<label class="answer-option">
            <input type="radio" name="question${index}" value="${key}" onchange="updateProgress()">
            ${key.toUpperCase()}: ${q.answers[key]}
          </label>`
        );
      }
  
      output.push(
        `<div class="question-container">
          <div class="question-number">Question ${index + 1}</div>
          <div class="question">${q.question}</div>
          <div class="answers">${answers.join("")}</div>
        </div>`
      );
    });
  
    quizContainer.innerHTML = output.join("");
    updateProgress();
    
    // Initial iframe height adjustment
    setTimeout(adjustIframeHeight, 500);
  }
  
  function showResults() {
    const answerContainers = document.querySelectorAll(".answers");
    let totalScore = 0;
    let answeredQuestions = 0;
  
    quizQuestions.forEach((q, index) => {
      const answerContainer = answerContainers[index];
      const selected = document.querySelector(`input[name=question${index}]:checked`);
      
      if (selected) {
        const userAnswer = selected.value;
        const score = q.points[userAnswer];
        totalScore += score;
        answeredQuestions++;
        
        // Highlight the selected answer
        answerContainer.style.color = "#2ecc71";
      } else {
        answerContainer.style.color = "#e74c3c";
      }
    });
  
    const resultsContainer = document.getElementById("results");
    const maxScore = quizQuestions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    let readinessLevel = "";
    let feedback = "";
    let badge = "";
    
    if (percentage >= 90) {
      readinessLevel = "AI Champion";
      feedback = "You're an AI champion! You're highly ready for AI adoption and can help lead change initiatives. Your enthusiasm and understanding make you an ideal advocate for AI integration.";
      badge = "🏆";
    } else if (percentage >= 75) {
      readinessLevel = "AI Ready";
      feedback = "You're well-prepared for AI adoption! You have a positive attitude toward change and good understanding of AI benefits. You'll likely adapt quickly to new AI tools.";
      badge = "⭐";
    } else if (percentage >= 60) {
      readinessLevel = "AI Curious";
      feedback = "You're curious about AI and moderately ready for adoption. With some support and education, you'll likely become comfortable with AI integration.";
      badge = "🤔";
    } else if (percentage >= 45) {
      readinessLevel = "AI Cautious";
      feedback = "You're cautious about AI adoption and may need additional support. Consider learning more about AI benefits and how it can enhance rather than replace your work.";
      badge = "⚠️";
    } else {
      readinessLevel = "AI Resistant";
      feedback = "You may be resistant to AI adoption. Consider discussing your concerns with leadership and learning more about how AI can support your role.";
      badge = "🔄";
    }
    
    resultsContainer.innerHTML = `
      <div class="results-summary">
        <div class="badge-container">
          <div class="badge">${badge}</div>
        </div>
        <h3>Your AI Change Readiness Results</h3>
        <div class="score-display">
          <div class="score-number">${totalScore}/${maxScore}</div>
          <div class="score-percentage">${Math.round(percentage)}%</div>
        </div>
        <div class="readiness-level">${readinessLevel}</div>
        <p class="feedback">${feedback}</p>
        <div class="score-breakdown">
          <h4>Score Breakdown:</h4>
          <p>• 45-50 points: AI Champion (90-100%)</p>
          <p>• 38-44 points: AI Ready (75-89%)</p>
          <p>• 30-37 points: AI Curious (60-74%)</p>
          <p>• 23-29 points: AI Cautious (45-59%)</p>
          <p>• 10-22 points: AI Resistant (20-44%)</p>
        </div>
      </div>
    `;
  
    // Show restart button and hide submit button
    document.getElementById("submit").style.display = "none";
    document.getElementById("restart").style.display = "block";
    
    // Adjust iframe height after showing results
    setTimeout(adjustIframeHeight, 100);
    
    // Scroll to results smoothly
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function restartQuiz() {
    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
    
    // Reset answer colors
    document.querySelectorAll('.answers').forEach(answer => {
      answer.style.color = '';
    });
    
    // Hide results and restart button
    document.getElementById("results").innerHTML = "";
    document.getElementById("restart").style.display = "none";
    document.getElementById("submit").style.display = "block";
    
    // Reset progress
    updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Event listeners
  document.getElementById("submit").addEventListener("click", showResults);
  document.getElementById("restart").addEventListener("click", restartQuiz);
  
  // Listen for window resize events
  window.addEventListener('resize', adjustIframeHeight);
  
  // Initialize quiz
  buildQuiz();