import { useState } from "react";
import Filter from "./Filter";
import PlaceList from "./PlaceList";

function SideBar({ filters, bakeryData }) {
  const [openFiltered, setOepnFiltered] = useState(false);
  const [distanceFiltered, setDistanceFiltered] = useState(false);
  const [shippingFiltered, setShippingFiltered] = useState(false);
  const [dineInFiltered, setDineInFiltered] = useState(false);

  let filtersNum;
  let isFilterOn = false;
  const filterLength = Object.entries(filters).length;

  const handleOpenFilter = function () {
    setOepnFiltered((on) => !on);
  };

  const handleDistanceFilter = function () {
    setDistanceFiltered((on) => !on);
  };

  const handleShippingFilter = function () {
    setShippingFiltered((on) => !on);
  };

  const handleDineInFilter = function () {
    setDineInFiltered((on) => !on);
  };

  if (openFiltered || distanceFiltered || shippingFiltered || dineInFiltered) {
    isFilterOn = true;
    filtersNum = filterLength - (filterLength - 1);
  }
  if (
    (openFiltered && distanceFiltered) ||
    (openFiltered && shippingFiltered) ||
    (openFiltered && dineInFiltered) ||
    (distanceFiltered && shippingFiltered) ||
    (distanceFiltered && dineInFiltered) ||
    (shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 2);
  if (
    (openFiltered && distanceFiltered && shippingFiltered) ||
    (openFiltered && distanceFiltered && dineInFiltered) ||
    (openFiltered && dineInFiltered && shippingFiltered) ||
    (distanceFiltered && shippingFiltered && dineInFiltered)
  )
    filtersNum = filterLength - (filterLength - 3);

  if (openFiltered && distanceFiltered && shippingFiltered && dineInFiltered)
    filtersNum = filterLength - 1;

  return (
    <div className="sidebar">
      <div className="filter-container">
        <Filter filterStatus={isFilterOn}>
          {filters.filter} {filtersNum}
        </Filter>
        <Filter onFilterClick={handleOpenFilter} filterStatus={openFiltered}>
          {filters.open}
        </Filter>
        <Filter
          onFilterClick={handleDistanceFilter}
          filterStatus={distanceFiltered}
        >
          {filters.distance}
        </Filter>
        <Filter
          onFilterClick={handleDineInFilter}
          filterStatus={dineInFiltered}
        >
          {filters.dineIn}
        </Filter>
        <Filter
          onFilterClick={handleShippingFilter}
          filterStatus={shippingFiltered}
        >
          {filters.shipping}
        </Filter>
      </div>
      <PlaceList
        openFiltered={openFiltered}
        distanceFiltered={distanceFiltered}
        bakeryData={bakeryData}
      />
    </div>
  );
}

export default SideBar;
