"use client";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import {
  AFRICA_COST_ROWS,
  formatAfricaMoney,
  type AfricaCountry,
} from "@/constants/africa";
import { AF } from "@/constants/africaTheme";

interface AfricaCostComparisonTableProps {
  /** When set via UTM, relabels the home-region column. */
  targetCountry?: AfricaCountry | null;
}

function cellDisplay(amountUsd: number | null): string {
  if (amountUsd == null) return "On request";
  return `from ${formatAfricaMoney(amountUsd)}`;
}

export function AfricaCostComparisonTable({ targetCountry }: AfricaCostComparisonTableProps) {
  const homeColumnLabel = targetCountry
    ? `${targetCountry} (private)`
    : "Africa (typical)";

  return (
    <Box>
      <TableContainer
        sx={{
          borderRadius: 2,
          border: `1px solid ${alpha(AF.ink, 0.1)}`,
          backgroundColor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table size="small" aria-label="Treatment cost comparison India vs Africa vs UK">
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(AF.primary, 0.08) }}>
              <TableCell sx={{ fontWeight: 700 }}>Treatment</TableCell>
              <TableCell sx={{ fontWeight: 700, color: AF.primary }}>India</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{homeColumnLabel}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>South Africa</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>UK</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AFRICA_COST_ROWS.map((row) => (
              <TableRow key={row.treatment} hover>
                <TableCell sx={{ fontWeight: 600, color: AF.text, whiteSpace: "nowrap" }}>
                  {row.treatment}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: AF.primary }}>
                  {cellDisplay(row.indiaUsd)}
                </TableCell>
                <TableCell sx={{ color: alpha(AF.text, 0.8) }}>
                  {cellDisplay(row.africaHomeUsd)}
                </TableCell>
                <TableCell sx={{ color: alpha(AF.text, 0.8) }}>
                  {cellDisplay(row.southAfricaUsd)}
                </TableCell>
                <TableCell sx={{ color: alpha(AF.text, 0.8) }}>
                  {cellDisplay(row.ukUsd)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1.5, color: alpha(AF.text, 0.55) }}
      >
        Indicative package floors for planning — not final quotes. India figures from
        hospital packages; Africa / SA / UK are typical private-hospital ranges. Final
        pricing confirmed after medical review of your reports.
      </Typography>
    </Box>
  );
}
