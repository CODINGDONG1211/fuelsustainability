const PARAM_WEIGHTS = {
    "calorific_value": 0.15,
    "density": 0.10,
    "viscosity": 0.05,
    "emissions": 0.30,
    "sulfur_content": 0.10,
    "flash_point": 0.10,
    "plastic_feedstock": 0.10,
    "lca": 0.10
};

function calculateSustainabilityScore(data) {
    let calorific_score = Math.min(Math.max(data.calorific_value, 0), 100) * PARAM_WEIGHTS['calorific_value'];
    let density_score = Math.min(Math.max(data.density, 0), 100) * PARAM_WEIGHTS['density'];
    let viscosity_score = Math.min(Math.max(data.viscosity, 0), 100) * PARAM_WEIGHTS['viscosity'];
    let emissions_score = (100 - Math.min(Math.max(data.emissions, 0), 100)) * PARAM_WEIGHTS['emissions'];
    let sulfur_score = (100 - Math.min(Math.max(data.sulfur_content, 0), 100)) * PARAM_WEIGHTS['sulfur_content'];
    let flash_point_score = Math.min(Math.max(data.flash_point, 0), 100) * PARAM_WEIGHTS['flash_point'];
    let plastic_feedstock_score = data.plastic_feedstock * PARAM_WEIGHTS['plastic_feedstock'];
    let lca_score = Math.min(Math.max(data.lca, 0), 100) * PARAM_WEIGHTS['lca'];

    let total_score = calorific_score + density_score + viscosity_score + emissions_score +
                      sulfur_score + flash_point_score + plastic_feedstock_score + lca_score;

    return total_score.toFixed(2);
}

document.getElementById('sustainability-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        calorific_value: parseFloat(formData.get('calorific_value')),
        density: parseFloat(formData.get('density')),
        viscosity: parseFloat(formData.get('viscosity')),
        emissions: parseFloat(formData.get('emissions')),
        sulfur_content: parseFloat(formData.get('sulfur_content')),
        flash_point: parseFloat(formData.get('flash_point')),
        plastic_feedstock: parseInt(formData.get('plastic_feedstock')),
        lca: parseFloat(formData.get('lca'))
    };

    const score = calculateSustainabilityScore(data);

    document.getElementById('result').textContent = `Your Fuel's Sustainability Score is: ${score}%`;
});
