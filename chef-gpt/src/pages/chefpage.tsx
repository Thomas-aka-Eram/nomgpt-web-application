import Navigation from "../components/Navigation";
import Layout from "../components/Layout";
import "../css/chefpage.css";
import { useAuth } from "../context/UserContext";

function ChefPage() {
  const { user } = useAuth();
  return (
    <Layout>
      <div className="chefmaincontainer">
        <div className="firstpage">
          <div className="chefmainpage">
            <div className="main-text">
              <h5>Meet NomGPT! 🍔</h5>
              <h1>
                Simplify Your Meals, <span>Elevate Your Flavors.</span>
              </h1>
              <h2>Your Kitchen, Your Recipes, Your Way.</h2>
              <p>
                NomGPT can provide more than 1,000+ recipes so say goodbye to
                boring meals with AI-powered recipe recommendations, and step by
                step instructions for evey meals.
              </p>
              <div className="trynombtn">
                <button type="button">Generate Your Meal</button>
              </div>
            </div>

            <div className="main-welcome"></div>
          </div>
        </div>
        <div className="nomintro">
          <div className="featureicon">
            <span className="material-symbols-outlined">
              local_fire_department
            </span>
            <h3>What NomGPT can do?</h3>
            <h2>Your Personal Chef, Trainer, Health Care Advisor</h2>
            <p>Cooking Made Smarter with AI.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChefPage;
