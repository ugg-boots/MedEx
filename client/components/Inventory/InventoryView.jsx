import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { Typography, Button, PAper } from '@material-ui/core';
import {KeyboardArrowDownIcon, KeyboardArrowUpIcon} from "@mui/icons-material/";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductName, postInventory } from "../../slices/inventorySlice";

const InventoryView = () => {
  const dispatch = useDispatch();
  const { allProductNames } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchProductName());
  }, []);
  console.log("all product names: ", allProductNames);

}