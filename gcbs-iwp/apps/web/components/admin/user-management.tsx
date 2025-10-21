"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@workspace/ui/components/navigation-menu";
import { Users, Plus, Search, Filter, Download, TrendingUp, FileText, Settings } from "lucide-react";

// Define User type locally
interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

interface UserManagementProps {
    user: User;
}

export function UserManagement({ user }: UserManagementProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    // Mock data - replace with actual API calls
    const users = [
        {
            id: "1",
            name: "Sonam Wangmo",
            email: "sonam.wangmo@university.edu",
            role: "LECTURER",
            department: "Biology",
            college: "Science & Technology",
            joinedAt: "2025-01-05",
            status: "active",
            lastLogin: "2025-01-09"
        },
        {
            id: "2",
            name: "Pema Tenzin",
            email: "pema.tenzin@university.edu",
            role: "SUPERVISOR",
            department: "Chemistry",
            college: "Science & Technology",
            joinedAt: "2025-01-04",
            status: "active",
            lastLogin: "2025-01-08"
        },
        {
            id: "3",
            name: "Sangay Tenzin",
            email: "sangay.tenzin@university.edu",
            role: "ADMIN",
            department: "Administration",
            college: "Administration",
            joinedAt: "2024-12-15",
            status: "active",
            lastLogin: "2025-01-10"
        },
        {
            id: "4",
            name: "Namgay",
            email: "namgay@university.edu",
            role: "LECTURER",
            department: "Mathematics",
            college: "Science & Technology",
            joinedAt: "2024-11-20",
            status: "inactive",
            lastLogin: "2024-12-28"
        },
    ];

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ADMIN":
                return <Badge variant="destructive">Admin</Badge>;
            case "SUPERVISOR":
                return <Badge variant="default">Supervisor</Badge>;
            case "LECTURER":
                return <Badge variant="secondary">Lecturer</Badge>;
            default:
                return <Badge variant="outline">{role}</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">Active</Badge>;
            case "inactive":
                return <Badge variant="outline" className="text-gray-600 border-gray-300">Inactive</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                            <p className="text-gray-600">Manage system users, roles, and permissions</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Button size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add User
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
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 bg-blue-50"
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Users
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/admin/iwps"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.length}</div>
                            <p className="text-xs text-muted-foreground">All registered users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
                            <p className="text-xs text-muted-foreground">Currently active</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Lecturers</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.filter(u => u.role === 'LECTURER').length}</div>
                            <p className="text-xs text-muted-foreground">Teaching staff</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Supervisors</CardTitle>
                            <Users className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.filter(u => u.role === 'SUPERVISOR').length}</div>
                            <p className="text-xs text-muted-foreground">Department heads</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search and Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search users by name, email, or department..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-400" />
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="SUPERVISOR">Supervisor</option>
                                    <option value="LECTURER">Lecturer</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Users ({filteredUsers.length})</CardTitle>
                        <CardDescription>Comprehensive user management interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>College</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                                        <TableCell>{user.department}</TableCell>
                                        <TableCell>{user.college}</TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">View</Button>
                                                <Button variant="outline" size="sm">Edit</Button>
                                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                                                    Deactivate
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