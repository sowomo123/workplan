"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@workspace/ui/components/navigation-menu";
import { FileText, Search, Filter, Download, Eye, Edit, Clock, CheckCircle, AlertCircle, XCircle, Users, TrendingUp, Settings } from "lucide-react";

// Define User type locally
interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

interface IWPManagementProps {
    user: User;
}

export function IWPManagement({ user }: IWPManagementProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterDepartment, setFilterDepartment] = useState("all");

    // Mock data - replace with actual API calls
    const iwps = [
        {
            id: "1",
            staffName: "Dr. John Smith",
            staffEmail: "john.smith@university.edu",
            department: "Computer Science",
            college: "Science & Technology",
            status: "pending",
            submittedAt: "2025-01-08",
            reviewerName: "Prof. Sarah Johnson",
            reviewerEmail: "sarah.johnson@university.edu",
            deadline: "2025-01-15",
            score: null,
            year: "2024",
            version: 1
        },
        {
            id: "2",
            staffName: "Dr. Emily Davis",
            staffEmail: "emily.davis@university.edu",
            department: "Mathematics",
            college: "Science & Technology",
            status: "completed",
            submittedAt: "2025-01-07",
            reviewerName: "Dr. Michael Brown",
            reviewerEmail: "michael.brown@university.edu",
            deadline: "2025-01-14",
            score: 85,
            year: "2024",
            version: 2
        },
        {
            id: "3",
            staffName: "Prof. Robert Wilson",
            staffEmail: "robert.wilson@university.edu",
            department: "Physics",
            college: "Science & Technology",
            status: "in_review",
            submittedAt: "2025-01-06",
            reviewerName: "Prof. Lisa Anderson",
            reviewerEmail: "lisa.anderson@university.edu",
            deadline: "2025-01-13",
            score: null,
            year: "2024",
            version: 1
        },
        {
            id: "4",
            staffName: "Dr. Alice Cooper",
            staffEmail: "alice.cooper@university.edu",
            department: "Biology",
            college: "Science & Technology",
            status: "rejected",
            submittedAt: "2025-01-05",
            reviewerName: "Prof. Sarah Johnson",
            reviewerEmail: "sarah.johnson@university.edu",
            deadline: "2025-01-12",
            score: null,
            year: "2024",
            version: 1
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case "completed":
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                    </Badge>
                );
            case "in_review":
                return (
                    <Badge variant="secondary" className="text-blue-600 border-blue-300">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        In Review
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const departments = Array.from(new Set(iwps.map(iwp => iwp.department)));

    const filteredIWPs = iwps.filter(iwp => {
        const matchesSearch = iwp.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            iwp.staffEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            iwp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            iwp.reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || iwp.status === filterStatus;
        const matchesDepartment = filterDepartment === "all" || iwp.department === filterDepartment;
        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const statusCounts = {
        total: iwps.length,
        pending: iwps.filter(iwp => iwp.status === 'pending').length,
        in_review: iwps.filter(iwp => iwp.status === 'in_review').length,
        completed: iwps.filter(iwp => iwp.status === 'completed').length,
        rejected: iwps.filter(iwp => iwp.status === 'rejected').length,
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">IWP Management</h1>
                            <p className="text-gray-600">Monitor and manage Individual Work Plans</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export Report
                            </Button>
                            <Button size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                Generate Analytics
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-8">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Overview
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin/users"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Users
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin/iwps"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 bg-blue-50"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    IWPs
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin/performance-assessment"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Performance Assessment
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin/settings"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total IWPs</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.total}</div>
                            <p className="text-xs text-muted-foreground">All submissions</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.pending}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Review</CardTitle>
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.in_review}</div>
                            <p className="text-xs text-muted-foreground">Being reviewed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.completed}</div>
                            <p className="text-xs text-muted-foreground">Review complete</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.rejected}</div>
                            <p className="text-xs text-muted-foreground">Needs revision</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search and Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by staff name, email, department, or reviewer..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_review">In Review</option>
                                        <option value="completed">Completed</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={filterDepartment}
                                        onChange={(e) => setFilterDepartment(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Departments</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* IWPs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Individual Work Plans ({filteredIWPs.length})</CardTitle>
                        <CardDescription>Complete overview of all IWP submissions and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staff Member</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reviewer</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIWPs.map((iwp) => (
                                    <TableRow key={iwp.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{iwp.staffName}</div>
                                                <div className="text-sm text-gray-600">{iwp.staffEmail}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{iwp.department}</div>
                                                <div className="text-sm text-gray-600">{iwp.college}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(iwp.status)}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{iwp.reviewerName}</div>
                                                <div className="text-sm text-gray-600">{iwp.reviewerEmail}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">{iwp.submittedAt}</TableCell>
                                        <TableCell className="text-sm">{iwp.deadline}</TableCell>
                                        <TableCell>
                                            {iwp.score ? (
                                                <span className="font-medium text-green-600">{iwp.score}/100</span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">v{iwp.version}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-3 h-3 mr-1" />
                                                    Edit
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}