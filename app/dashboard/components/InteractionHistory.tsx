"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEngagementPoints } from "@/hooks/useEngagementPoints";

export function InteractionHistory() {
  const [date, setDate] = useState<Date>();
  const { interactions, loading } = useEngagementPoints();

  const filteredInteractions = date
    ? interactions.filter(
        (interaction) =>
          format(new Date(interaction.created_at), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      )
    : interactions;

  return (
    <Card className="glassmorphic p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Interaction History</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black/90 border-white/20">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Points</TableHead>
              <TableHead className="text-white">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-300"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredInteractions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-300"
                >
                  No interactions found
                </TableCell>
              </TableRow>
            ) : (
              filteredInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="text-gray-300">
                    {interaction.engagement_type}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {interaction.points}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {format(
                      new Date(interaction.created_at),
                      "MMM d, yyyy HH:mm"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}