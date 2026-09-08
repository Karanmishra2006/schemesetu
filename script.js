let profile = {
    need: "business_new",
    gender: "female",
    category: "yes"
};


/* SCREEN NAVIGATION */

function goToScreen(number) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById("screen" + number)
        .classList.add("active");


    const indicator =
        document.getElementById("stepIndicator");


    if (number === 1) {
        indicator.textContent = "Welcome";
    } else {
        indicator.textContent =
            "Step " + (number - 1) + " of 4";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* OPTION BUTTONS */

function setupOptions(groupId, key) {

    const group =
        document.getElementById(groupId);

    const buttons =
        group.querySelectorAll(".option");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            profile[key] =
                button.dataset.value;

        });

    });

}


setupOptions("needGroup", "need");
setupOptions("genderGroup", "gender");
setupOptions("categoryGroup", "category");


/* SCHEME DATA */

const schemes = [

    {
        name: "Micro Finance Scheme",

        description:
            "Small-ticket financial assistance for self-employment and micro businesses.",

        maxCost: 150000,

        rate: 8,

        tenure: 5
    },

    {
        name: "Term Loan Scheme",

        description:
            "Financial assistance for setting up or expanding an enterprise.",

        maxCost: 2000000,

        rate: 10,

        tenure: 7
    },

    {
        name: "Mahila Samriddhi Yojana",

        description:
            "Concessional financial assistance for women entrepreneurs.",

        maxCost: 150000,

        rate: 6,

        tenure: 5
    }

];


/* START ELIGIBILITY */

function startEligibility() {

    profile.cost =
        Number(
            document.getElementById("cost").value
        );

    profile.income =
        Number(
            document.getElementById("income").value
        );

    profile.age =
        Number(
            document.getElementById("age").value
        );


    goToScreen(3);


    const progress =
        document.getElementById("progressBar");


    setTimeout(() => {
        progress.style.width = "35%";
    }, 500);


    setTimeout(() => {
        progress.style.width = "70%";
    }, 1200);


    setTimeout(() => {
        progress.style.width = "100%";
    }, 1800);


    setTimeout(() => {

        generateResults();

        goToScreen(4);

        progress.style.width = "0%";

    }, 2400);

}


/* GENERATE RESULTS */

function generateResults() {

    const container =
        document.getElementById("schemeResults");

    container.innerHTML = "";


    schemes.forEach((scheme, index) => {

        let score = 80;


        if (profile.cost > scheme.maxCost) {
            score -= 30;
        }


        if (profile.income > 500000) {
            score -= 15;
        }


        if (
            scheme.name === "Mahila Samriddhi Yojana" &&
            profile.gender !== "female"
        ) {
            score -= 50;
        }


        score = Math.max(0, score);


        const card =
            document.createElement("div");

        card.className = "scheme-card";


        card.innerHTML = `

            <div class="scheme-info">

                <h3>${scheme.name}</h3>

                <p>${scheme.description}</p>

            </div>


            <div class="score">

                <div class="score-number">
                    ${score}%
                </div>


                <button
                    class="primary-btn"
                    onclick="openScheme(${index})">

                    View Details

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* OPEN SCHEME */

function openScheme(index) {

    const scheme =
        schemes[index];


    document.getElementById("schemeTitle")
        .textContent = scheme.name;


    document.getElementById("schemeDescription")
        .textContent = scheme.description;


    document.getElementById("loanAmount")
        .value = profile.cost;


    document.getElementById("interestRate")
        .value = scheme.rate;


    document.getElementById("tenure")
        .value = scheme.tenure;


    document.getElementById("rulesList")
        .innerHTML = `

        <div class="rule">
            <span class="pass">✓</span>
            Applicant profile successfully analysed.
        </div>

        <div class="rule">
            <span class="pass">✓</span>
            Project requirement matched against scheme criteria.
        </div>

        <div class="rule">
            <span class="pass">✓</span>
            Income and category details evaluated.
        </div>

    `;


    goToScreen(5);

}


/* EMI CALCULATOR */

function calculateEMI() {

    const P =
        Number(
            document.getElementById("loanAmount").value
        );


    const annualRate =
        Number(
            document.getElementById("interestRate").value
        );


    const years =
        Number(
            document.getElementById("tenure").value
        );


    const r =
        annualRate / 12 / 100;


    const n =
        years * 12;


    let emi;


    if (r === 0) {

        emi = P / n;

    } else {

        emi =
            P *
            r *
            Math.pow(1 + r, n) /
            (
                Math.pow(1 + r, n) - 1
            );

    }


    document.getElementById("emiResult")
        .style.display = "block";


    document.getElementById("emiValue")
        .textContent =
        "₹" +
        Math.round(emi)
            .toLocaleString("en-IN");

}