"use client";

import { useRoleProtection } from "@/lib/auth-utils";
import { Loader2, UserCircle, Briefcase, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

// Updated mock data for employees with rates
const employees = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    department: "Engineering",
    position: "Software Developer",
    status: "active",
    interRate: 150,
    bsRate: 200,
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "active",
    interRate: 120,
    bsRate: 180,
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "3",
    name: "David Kim",
    email: "david.kim@example.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "inactive",
    interRate: 200,
    bsRate: 250,
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "4",
    name: "Sarah Robinson",
    email: "sarah.robinson@example.com",
    department: "Human Resources",
    position: "HR Coordinator",
    status: "active",
    interRate: 130,
    bsRate: 170,
    avatar: "https://images.pexels.com/photos/2216607/pexels-photo-2216607.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "5",
    name: "Michael Lee",
    email: "michael.lee@example.com",
    department: "Product",
    position: "Product Manager",
    status: "active",
    interRate: 180,
    bsRate: 220,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "6",
    name: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    department: "Customer Support",
    position: "Support Specialist",
    status: "active",
    interRate: 110,
    bsRate: 150,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "7",
    name: "Carlos Mendez",
    email: "carlos.mendez@example.com",
    department: "Engineering",
    position: "QA Engineer",
    status: "active",
    interRate: 140,
    bsRate: 190,
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "8",
    name: "Laura Wilson",
    email: "laura.wilson@example.com",
    department: "Marketing",
    position: "Content Writer",
    status: "inactive",
    interRate: 125,
    bsRate: 165,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
];

interface EditRatesDialogProps {
  employee: typeof employees[0];
  onSave: (id: string, interRate: number, bsRate: number) => void;
}

function EditRatesDialog({ employee, onSave }: EditRatesDialogProps) {
  const [interRate, setInterRate] = useState(employee.interRate);
  const [bsRate, setBsRate] = useState(employee.bsRate);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (interRate < 100 || interRate > 2000 || bsRate < 100 || bsRate > 2000) {
      toast.error("Rates must be between 100 and 2000");
      return;
    }
    onSave(employee.id, interRate, bsRate);
    setOpen(false);
    toast.success("Rates updated successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Rates for {employee.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="interRate">Inter Rate</Label>
            <Input
              id="interRate"
              type="number"
              min="100"
              max="2000"
              value={interRate}
              onChange={(e) => setInterRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bsRate">BS Rate</Label>
            <Input
              id="bsRate"
              type="number"
              min="100"
              max="2000"
              value={bsRate}
              onChange={(e) => setBsRate(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EmployeesPage() {
  const [employeeData, setEmployeeData] = useState(employees);
  const { isLoading } = useRoleProtection(["superadmin", "admin"]);

  const handleUpdateRates = (id: string, interRate: number, bsRate: number) => {
    setEmployeeData(prev =>
      prev.map(emp =>
        emp.id === id
          ? { ...emp, interRate, bsRate }
          : emp
      )
    );
  };

  const columns = [
    {
      key: "name" as const,
      title: "Name",
      render: (value: string, employee: typeof employees[0]) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={employee.avatar} alt={value} />
            <AvatarFallback>
              <UserCircle className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "email" as const,
      title: "Email",
    },
    {
      key: "department" as const,
      title: "Department",
    },
    {
      key: "position" as const,
      title: "Position",
    },
    {
      key: "interRate" as const,
      title: "Inter Rate",
      render: (value: number) => (
        <span className="font-medium">${value}</span>
      ),
    },
    {
      key: "bsRate" as const,
      title: "BS Rate",
      render: (value: number) => (
        <span className="font-medium">${value}</span>
      ),
    },
    {
      key: "status" as const,
      title: "Status",
      render: (value: string) => (
        <Badge
          variant={value === "active" ? "default" : "secondary"}
          className={
            value === "active" ? "bg-green-500" : "bg-slate-400"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "actions" as const,
      title: "",
      render: (_: any, employee: typeof employees[0]) => (
        <EditRatesDialog
          employee={employee}
          onSave={handleUpdateRates}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-amber-500" />
          Employees
        </h2>
        <p className="text-muted-foreground">
          Manage employee accounts across all departments
        </p>
      </div>

      <Card className="p-6">
        <DataTable
          data={employeeData}
          columns={columns}
          searchField="name"
          itemsPerPage={5}
        />
      </Card>
    </div>
  );
}