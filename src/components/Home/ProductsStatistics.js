import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Product statistics</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: 2,
            }}
            width="100%"
            height={350}
            src="https://charts.mongodb.com/charts-shoesecom-izhgj/embed/charts?id=634a5f50-9155-4f51-8386-7c67192e32cc&maxDataAge=600&theme=light&autoRefresh=true"
          />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
