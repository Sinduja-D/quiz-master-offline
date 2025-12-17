const detectiveCases = [
  {
    id: 1,
    title: {
      English: "The Silent Laboratory",
      Tamil: "மௌன ஆய்வகம்"
    },
    intro: {
      English:
        "A school laboratory was locked overnight. In the morning, all bacteria samples were dead. Investigate what human or environmental action caused this.",
      Tamil:
        "ஒரு பள்ளி ஆய்வகம் இரவு முழுவதும் பூட்டப்பட்டது. காலை வந்தபோது அனைத்து பாக்டீரியாக்களும் இறந்திருந்தன. இதற்கு காரணமான மனித செயல்பாடு அல்லது சுற்றுச்சூழல் காரணத்தை கண்டறியவும்."
    },
    instruction: {
      English: "Solve 3 clues to reach the final conclusion.",
      Tamil: "3 குறிப்புகளை தீர்த்து இறுதி முடிவை அடையவும்."
    },
    questions: [
      {
        q: {
          English: "Bacteria generally need which condition to thrive?",
          Tamil: "பாக்டீரியாக்கள் வளர எது அவசியம்?"
        },
        options: ["Extreme heat", "Suitable temperature & moisture", "No air"],
        answer: 1,
        hint: {
          English: "Think warmth and moisture, not vacuum.",
          Tamil: "வெப்பமும் ஈரமும் தேவை, வெற்றிடம் இல்லை."
        }
      },
      {
        q: {
          English: "Which of these actions would directly kill bacteria samples?",
          Tamil: "இவற்றில் எது நேரடியாக பாக்டீரியாக்களை அழிக்கும்?"
        },
        options: ["Left overnight", "Cleaned with disinfectant", "Turned off lights"],
        answer: 1,
        hint: {
          English: "Cleaning for safety after class.",
          Tamil: "பாடம் 끝ித்துப் பாதுகாப்பாக சுத்தம் செய்தல்."
        }
      },
      {
        q: {
          English: "Which explains why all samples were dead by morning?",
          Tamil: "காலை வரையில் அனைத்து மாதிரிகளும் நிகழ்ந்ததை எது விளக்குகிறது?"
        },
        options: ["Lab heater failed", "Someone disinfected the lab", "Power outage only"],
        answer: 1,
        hint: {
          English: "A deliberate cleaning action fits best.",
          Tamil: "ஒரு जानते சுத்தம் செய்தல் சிறந்தவாறு பொருந்தும்."
        }
      }
    ],
    conclusion: {
      English:
        "The lab was disinfected overnight; disinfectant killed the bacteria samples.",
      Tamil:
        "இரவில் ஆய்வகவம் கிருமிநாசினியால் சுத்தம் செய்யப்பட்டது; அதனால் மாதிரிகள் இறந்தன."
    },
    badge: {
      English: "Sterile Sleuth",
      Tamil: "ஜீரணத் தெரியானவர்"
    }
  },

  {
    id: 2,
    title: {
      English: "The Vanishing Oxygen",
      Tamil: "மாயமான ஆக்ஸிஜன்"
    },
    intro: {
      English:
        "Fish in the school aquarium died overnight without external injuries. Determine the environmental cause.",
      Tamil:
        "பள்ளி அக்வேரியத்தில் மீன்கள் காயமின்றி இறந்தன. சுற்றுச்சூழல் காரணத்தை கண்டறியவும்."
    },
    instruction: {
      English: "Answer three clues to determine what removed oxygen from the water.",
      Tamil: "நீரில் ஆக்ஸிஜனை எதனால் குறைந்தது என்பதைக் கண்டறிய 3 குறிப்புகளைத் தீர்க்கவும்."
    },
    questions: [
      {
        q: {
          English: "Fish extract oxygen from water using?",
          Tamil: "மீன்கள் நீரிலிருந்து ஆக்ஸிஜன் எதனால் எடுப்பார்கள்?"
        },
        options: ["Lungs", "Gills", "Fins"],
        answer: 1,
        hint: {
          English: "Thin feathery organs on the sides of a fish's head.",
          Tamil: "மீன்களின் தலையின் பக்கத்தில் உள்ள நெகிழ்வான உறுப்புகள்."
        }
      },
      {
        q: {
          English: "Which of these reduces dissolved oxygen quickly?",
          Tamil: "இவற்றில் எது நீரில் கரைந்து உள்ள ஆக்ஸிஜனை விரைவில் குறைக்கும்?"
        },
        options: ["Fresh plants", "Pollution / organic waste", "Aeration"],
        answer: 1,
        hint: {
          English: "Rotting waste and chemicals consume oxygen.",
          Tamil: "முந்தை கழிவுகள் மற்றும் ரசாயனம் ஆக்ஸிஜனை உஷ்ணம் செய்கிறது."
        }
      },
      {
        q: {
          English: "Most likely reason fish died?",
          Tamil: "மிழைகள் இறந்ததைத் தவிர்க்கக்கூடிய காரணம்?"
        },
        options: ["Lack of food", "Low oxygen", "Sudden cold"],
        answer: 1,
        hint: {
          English: "They could not breathe underwater.",
          Tamil: "நீரின் உள்ளே சுவாசிக்க முடியவில்லை."
        }
      }
    ],
    conclusion: {
      English:
        "Pollution (organic waste/chemicals) reduced dissolved oxygen and the fish suffocated.",
      Tamil:
        "மாசுபாடு நீரில் கரைந்த ஆக்ஸிஜன் அளவை குறைத்ததால் மீன்கள் சிக்கினர்."
    },
    badge: {
      English: "Aqua Analyst",
      Tamil: "நீர் நிபுணர்"
    }
  },

  {
    id: 3,
    title: {
      English: "The Sizzling Circuit",
      Tamil: "சுழலும் மின் வட்டம்"
    },
    intro: {
      English:
        "During a school fair, a science model's circuit kept overheating and stopped working. Find the fault in the setup.",
      Tamil:
        "பள்ளி கண்காட்சியில் ஒரு அறிவியல் மாதிரியின் மின் வட்டம் அதிகமாக சூடானது மற்றும் செயலிழந்தது. அமைப்பில் குறையை கண்டறியவும்."
    },
    instruction: {
      English: "Use three clues to find the electrical mistake.",
      Tamil: "மின் பிழையை கண்டறிய 3 குறிப்புகளை பயன்படுத்தவும்."
    },
    questions: [
      {
        q: {
          English: "Excessive heat in a circuit often comes from?",
          Tamil: "ஒரு மின் வட்டத்தில் அதிக வெப்பம் பெரும்பாலும் எதிலிருந்து வரும்?"
        },
        options: ["Loose wires or high current", "Low battery", "Cold environment"],
        answer: 0,
        hint: {
          English: "High resistance or too much current causes heating.",
          Tamil: "உயர் எதிர்ப்பு அல்லது அதிக மின் ஓட்டம் வெப்பத்தை உருவாக்கும்."
        }
      },
      {
        q: {
          English: "What happens if components are shorted (direct connection)?",
          Tamil: "உபகரணங்கள் குறுகிய நிலையில் சேர்ந்தால் என்ன நடக்கும்?"
        },
        options: ["Current increases drastically", "Circuit stops permanently", "Voltage becomes negative"],
        answer: 0,
        hint: {
          English: "A short lowers resistance and increases current, heating parts.",
          Tamil: "குறைந்த எதிர்ப்பு அதிக ஓட்டத்தை உண்டாக்கி கூறுகளை சூடாகாக்கும்."
        }
      },
      {
        q: {
          English: "Most likely fault in the model?",
          Tamil: "மாதிரியில் அதிகமான பிழை என்னவாக இருக்கும்?"
        },
        options: ["Wrong resistor value causing overheating", "Broken switch", "Loose label"],
        answer: 0,
        hint: {
          English: "A weak resistor lets more current through and gets hot.",
          Tamil: "தவறான போதனை எதிர்ப்பு அதிக ஓட்டத்தை அனுசரிக்கச் செய்யும்."
        }
      }
    ],
    conclusion: {
      English:
        "An incorrect/low-value resistor or a short allowed excessive current, causing components to overheat and fail.",
      Tamil:
        "தவறான எதிர்ப்பு அல்லது குறுகிய இணைப்பு அதிக மின்நடத்தை அனுமதித்து கூறுகள் சூடடைந்து செயலிழந்தன."
    },
    badge: {
      English: "Circuit Sleuth",
      Tamil: "மின் கண்டறியலாளர்"
    }
  },

  {
    id: 4,
    title: {
      English: "The Vanishing Seeds",
      Tamil: "மறைந்து போன விதைகள்"
    },
    intro: {
      English:
        "Plant seeds in a greenhouse failed to germinate while outside seeds did well. Uncover the environmental cause.",
      Tamil:
        "கிரீன்ஹவுஸுக்குள்ளுள் விதைகள் முளைக்கவில்லை ஆனால் வெளியிலுள்ளவை சுயமாக வளர்ந்தன. சுற்றுச்சூழல் காரணத்தை கண்டுபிடிக்கவும்."
    },
    instruction: {
      English: "Solve the three clues to diagnose the greenhouse issue.",
      Tamil: "கிரீன்ஹவுஸின் பிரச்சனையை கண்டறிய 3 குறிப்புகளை தீர்க்கவும்."
    },
    questions: [
      {
        q: {
          English: "Seeds need which to germinate?",
          Tamil: "விதைகள் முளைத்துவிக்கும் போது எது தேவை?"
        },
        options: ["Light (for some), water and oxygen", "Complete darkness only", "No water"],
        answer: 0,
        hint: {
          English: "Most seeds require moisture and oxygen; some need light.",
          Tamil: "பல விதைகள் ஈரமும் ஆக்சிஜனும் தேவை; சில உணர்வு ஒளியைத் தேவைப்படுத்தலாம்."
        }
      },
      {
        q: {
          English: "Too much humidity in greenhouse can cause?",
          Tamil: "கிரீன்ஹவுஸில் அதிக ஈரப்பதம் என்ன ஏற்படுத்தும்?"
        },
        options: ["Mold and poor oxygen for seeds", "Faster germination", "Less sunlight only"],
        answer: 0,
        hint: {
          English: "Stale, humid air encourages mold and reduces oxygen at seed level.",
          Tamil: "மின்றிய, ஈரம் வாயு சாலையை ஊக்குவித்து ஆக்ஸிஜன் குறையும்."
        }
      },
      {
        q: {
          English: "Most likely reason seeds failed?",
          Tamil: "விதைகள் தோல்வியடைந்த முக்கிய காரணம்?"
        },
        options: ["Overwatering & mold", "Too much sunlight", "Right soil"],
        answer: 0,
        hint: {
          English: "Overwatering + stagnant air is common in closed spaces.",
          Tamil: "அதிக நீர் மற்றும் நிலையான காற்றின் பற்றாக்குறை அடிக்கடி ஏற்படும்."
        }
      }
    ],
    conclusion: {
      English:
        "High humidity and overwatering caused mold and poor oxygen, preventing germination in the greenhouse.",
      Tamil:
        "அதிக ஈரப்பதம் மற்றும் சூழலியல் நீர் காரணமால் கிரீன்ஹவுஸில் முளைப்பு தோல்வியடைந்தது."
    },
    badge: {
      English: "Greenhouse Detective",
      Tamil: "பசுமை விசாரணையாளர்"
    }
  },

  {
    id: 5,
    title: {
      English: "The Fading Colors",
      Tamil: "வண்ணங்கள் மங்கல்"
    },
    intro: {
      English:
        "A colorful paper experiment lost its dye rapidly. Figure out the chemistry behind the sudden fading.",
      Tamil:
        "ஒரு வண்ணம் பொருந்திய காகிதக் காட்சி தனது நிறத்தை விரைவில் இழந்தது. திடீர் மங்கலின் ரசாயன காரணத்தை கண்டறியவும்."
    },
    instruction: {
      English: "Three clues will reveal what caused dyes to wash away.",
      Tamil: "வண்ணம் நீங்கக்கூடிய காரணத்தை கண்டறிய 3 குறிப்புகள் உதவும்."
    },
    questions: [
      {
        q: {
          English: "What causes dye molecules to detach from paper?",
          Tamil: "வண்ண மூலக்கூறுகள் காகிதத்தில் இருந்து எப்படி ஏறிவிடும்?"
        },
        options: ["Solvent action (water/chemicals)", "Sunlight alone", "Paper thickness"],
        answer: 0,
        hint: {
          English: "Washing or strong solvents remove dyes.",
          Tamil: "வீச்சல் அல்லது வலுவான கரைமைகள் வண்ணங்களை நீக்குகிறன."
        }
      },
      {
        q: {
          English: "Exposure to which speeds up color loss?",
          Tamil: "எதிர்காலம் எது வண்ண மங்கலை விரைவாக்கும்?"
        },
        options: ["Rain / water contact", "Dry air", "Warmth only"],
        answer: 0,
        hint: {
          English: "Water dissolves and washes dyes away.",
          Tamil: "நீர் வண்ணங்களை கரைத்து கொள்கிறது."
        }
      },
      {
        q: {
          English: "Most likely cause here?",
          Tamil: "இங்கே மிக நேர் காரணம்?"
        },
        options: [
          "Paper stored near heater",
          "Paper got wet during cleanup",
          "Wrong paper type"
        ],
        answer: 1,
        hint: {
          English: "A cleaning spill or splatter can strip dyes quickly.",
          Tamil: "ஒரு சுத்தமான திரவம் அல்லது உதிர்வு வண்ணங்களை நீக்கக்கூடும்."
        }
      }
    ],
    conclusion: {
      English:
        "Cleaning/solvent contact during handling washed away the dyes, causing the colors to fade quickly.",
      Tamil:
        "கைப்பிடிப்பின் போது சுத்தம் செய்யும் திரவம் வண்ணங்களை கழுவிவிட்டதால் நிறங்கள் மங்கின."
    },
    badge: {
      English: "Chromatic Solver",
      Tamil: "நிற தீர்ப்பவர்"
    }
  }
];

export default detectiveCases;
