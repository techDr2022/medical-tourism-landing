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
  COST_COMPARISON_ROWS,
  NGN_PER_USD_APPROX,
  formatMoney,
  type CurrencyMode,
} from "@/constants/nigeria";

const GREEN_600 = "#1c7c7f";

interface CostComparisonTableProps {
  currency: CurrencyMode;
}

function cellDisplay(amountUsd: number | null, currency: CurrencyMode): string {
  if (amountUsd == null) return "On request";
  return `from ${formatMoney(amountUsd, currency)}`;
}

export function CostComparisonTable({ currency }: CostComparisonTableProps) {
  return (
    <Box>
      <TableContainer
        sx={{
          borderRadius: 2,
          border: `1px solid ${alpha("#171717", 0.1)}`,
          backgroundColor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table size="small" aria-label="Treatment cost comparison India vs other markets">
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(GREEN_600, 0.08) }}>
              <TableCell sx={{ fontWeight: 700 }}>Treatment</TableCell>
              <TableCell sx={{ fontWeight: 700, color: GREEN_600 }}>India</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>South Africa</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>UK</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>UAE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {COST_COMPARISON_ROWS.map((row) => (
              <TableRow key={row.treatment} hover>
                <TableCell sx={{ fontWeight: 600, color: "#171717", whiteSpace: "nowrap" }}>
                  {row.treatment}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: GREEN_600 }}>
                  {cellDisplay(row.indiaUsd, currency)}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      row.southAfricaUsd == null
                        ? alpha("#171717", 0.45)
                        : alpha("#171717", 0.8),
                    fontStyle: row.southAfricaUsd == null ? "italic" : "normal",
                  }}
                >
                  {cellDisplay(row.southAfricaUsd, currency)}
                </TableCell>
                <TableCell sx={{ color: alpha("#171717", 0.8) }}>
                  {cellDisplay(row.ukUsd, currency)}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      row.uaeUsd == null ? alpha("#171717", 0.45) : alpha("#171717", 0.8),
                    fontStyle: row.uaeUsd == null ? "italic" : "normal",
                  }}
                >
                  {cellDisplay(row.uaeUsd, currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1.5, color: alpha("#171717", 0.55) }}
      >
        Indicative package floors. Final quotes after medical review.
        {currency === "NGN"
          ? ` NGN amounts use an approximate rate of 1 USD ≈ ₦${NGN_PER_USD_APPROX.toLocaleString("en-NG")}.`
          : null}
      </Typography>
    </Box>
  );
}
