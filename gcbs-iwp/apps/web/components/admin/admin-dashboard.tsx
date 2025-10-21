"use client";

import React from "react";
// Define User type locally or import from the correct location
interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@workspace/ui/components/navigation-menu";
import { Users, FileText, Settings, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface AdminDashboardProps {
    user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    // Mock data - replace with actual API calls
    const dashboardStats = {
        totalUsers: 156,
        totalIWPs: 89,
        pendingReviews: 23,
        completedReviews: 66,
    };

    // User profile data - This would typically come from your database
    // For now, using mock data with the actual user email from WorkOS
    const userProfile = {
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
        email: user.email,
        staffId: 'STF-2024-001', // This would come from your database
        positionLevel: 'Senior Lecturer', // This would come from your database
        appraisalPeriod: '2024-2025', // This would come from your database
        positionTitle: 'Assistant Professor', // This would come from your database
        college: 'College of Computing and Informatics', // This would come from your database
        division: 'Computer Science Department', // This would come from your database
    };

    const recentIWPs = [
        {
            id: "1",
            staffName: "Sonam Wangmo",
            department: "Computer Science",
            status: "pending",
            submittedAt: "2025-01-08",
            reviewerName: "Prof. Sarah Johnson"
        },
        {
            id: "2",
            staffName: "Sangay Tenzin",
            department: "Mathematics",
            status: "completed",
            submittedAt: "2025-01-07",
            reviewerName: "Dr. Michael Brown"
        },
        {
            id: "3",
            staffName: "Namgaylhamo",
            department: "Physics",
            status: "in_review",
            submittedAt: "2025-01-06",
            reviewerName: "Prof. Lisa Anderson"
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
            case "completed":
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
            case "in_review":
                return <Badge variant="secondary" className="text-blue-600 border-blue-300"><AlertCircle className="w-3 h-3 mr-1" />In Review</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {userProfile.name}</p>
                        </div>
                        <div className="flex items-center space-x-4">

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm text-gray-700">{userProfile.email}</span>
                            </div>
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
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 bg-blue-50"
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
                <div className="space-y-8">
                    {/* User Profile Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">User Profile Information</CardTitle>
                            <CardDescription>Details of the currently logged-in user</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Name</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Staff ID No</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.staffId}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Position Level</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.positionLevel}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Appraisal Period</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.appraisalPeriod}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Position Title</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.positionTitle}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">College</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.college}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Division</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{userProfile.division}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                                <p className="text-xs text-muted-foreground">
                                    +12% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total IWPs</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardStats.totalIWPs}</div>
                                <p className="text-xs text-muted-foreground">
                                    +8% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardStats.pendingReviews}</div>
                                <p className="text-xs text-muted-foreground">
                                    -4% from last week
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardStats.completedReviews}</div>
                                <p className="text-xs text-muted-foreground">
                                    +23% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent IWP Submissions</CardTitle>
                                <CardDescription>Latest individual work plan submissions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentIWPs.map((iwp) => (
                                        <div key={iwp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">{iwp.staffName}</p>
                                                <p className="text-sm text-gray-600">{iwp.department}</p>
                                                <p className="text-xs text-gray-500">Reviewer: {iwp.reviewerName}</p>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(iwp.status)}
                                                <p className="text-xs text-gray-500 mt-1">{iwp.submittedAt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}