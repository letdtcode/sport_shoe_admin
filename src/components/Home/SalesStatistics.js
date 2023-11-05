import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê doanh thu</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: 2,
            }}
            width="100%"
            height={350}
            src="https://charts.mongodb.com/charts-shoesecom-izhgj/embed/charts?id=634a5ba5-427e-43da-8009-1148275d54bc&maxDataAge=1800&theme=light&autoRefresh=true"
          />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
