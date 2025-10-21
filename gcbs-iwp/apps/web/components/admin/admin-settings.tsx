"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@workspace/ui/components/navigation-menu";
import { Settings, Users, FileText, TrendingUp, Save, RefreshCw, Shield, Database, Mail, UserPlus } from "lucide-react";

// Define User type locally
interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

interface AdminSettingsProps {
    user: User;
}

export function AdminSettings({ user }: AdminSettingsProps) {
    const [settings, setSettings] = useState({
        siteName: "IWP Management System",
        emailNotifications: true,
        autoBackup: true,
        maintenanceMode: false,
        userRegistration: true,
        reviewDeadline: "14",
        maxFileSize: "10",
    });

    const [staffSettings, setStaffSettings] = useState({
        staffName: "",
        staffIdNo: "",
        positionLevel: "",
        appraisalPeriod: "",
        positionTitle: "",
        college: "",
        division: "",
    });

    const handleSave = () => {
        // In a real application, you would save settings to the backend
        console.log("Settings saved:", settings);
        console.log("Staff settings saved:", staffSettings);
        alert("Settings saved successfully!");
    };

    const handleReset = () => {
        // Reset to default values
        setSettings({
            siteName: "IWP Management System",
            emailNotifications: true,
            autoBackup: true,
            maintenanceMode: false,
            userRegistration: true,
            reviewDeadline: "14",
            maxFileSize: "10",
        });
        setStaffSettings({
            staffName: "",
            staffIdNo: "",
            positionLevel: "",
            appraisalPeriod: "",
            positionTitle: "",
            college: "",
            division: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600">Configure system settings and preferences</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" onClick={handleReset}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reset to Defaults
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
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
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 bg-blue-50"
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Settings className="w-5 h-5 mr-2" />
                                General Settings
                            </CardTitle>
                            <CardDescription>Basic system configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Site Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Review Deadline (days)
                                </label>
                                <input
                                    type="number"
                                    value={settings.reviewDeadline}
                                    onChange={(e) => setSettings({ ...settings, reviewDeadline: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum File Size (MB)
                                </label>
                                <input
                                    type="number"
                                    value={settings.maxFileSize}
                                    onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>Access control and security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">User Registration</p>
                                    <p className="text-sm text-gray-600">Allow new users to register</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.userRegistration}
                                        onChange={(e) => setSettings({ ...settings, userRegistration: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Maintenance Mode</p>
                                    <p className="text-sm text-gray-600">Temporarily disable the system</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                Notification Settings
                            </CardTitle>
                            <CardDescription>Email and notification preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                    <p className="text-sm text-gray-600">Send email notifications for key events</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Database className="w-5 h-5 mr-2" />
                                System Settings
                            </CardTitle>
                            <CardDescription>Database and system maintenance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Automatic Backup</p>
                                    <p className="text-sm text-gray-600">Enable daily automatic backups</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoBackup}
                                        onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <Button variant="outline" className="w-full">
                                    <Database className="w-4 h-4 mr-2" />
                                    Run Database Backup Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Staff Management Settings */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <UserPlus className="w-5 h-5 mr-2" />
                                Staff Management Settings
                            </CardTitle>
                            <CardDescription>Configure staff information and appraisal settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Staff Name
                                    </label>
                                    <input
                                        type="text"
                                        value={staffSettings.staffName}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, staffName: e.target.value })}
                                        placeholder="Enter full staff name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Staff ID No
                                    </label>
                                    <input
                                        type="text"
                                        value={staffSettings.staffIdNo}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, staffIdNo: e.target.value })}
                                        placeholder="Enter staff ID number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Position Level
                                    </label>
                                    <select
                                        value={staffSettings.positionLevel}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, positionLevel: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select position level</option>
                                        <option value="Junior Lecturer">Junior Lecturer</option>
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="Senior Lecturer">Senior Lecturer</option>
                                        <option value="Associate Professor">Associate Professor</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Administrative Staff">Administrative Staff</option>
                                        <option value="Technical Staff">Technical Staff</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Appraisal Period
                                    </label>
                                    <select
                                        value={staffSettings.appraisalPeriod}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, appraisalPeriod: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select appraisal period</option>
                                        <option value="January - December 2024">January - December 2024</option>
                                        <option value="January - December 2025">January - December 2025</option>
                                        <option value="July 2024 - June 2025">July 2024 - June 2025</option>
                                        <option value="July 2025 - June 2026">July 2025 - June 2026</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Position Title
                                    </label>
                                    <input
                                        type="text"
                                        value={staffSettings.positionTitle}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, positionTitle: e.target.value })}
                                        placeholder="Enter specific position title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        College
                                    </label>
                                    <select
                                        value={staffSettings.college}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, college: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select college</option>
                                        <option value="College of Computing and Informatics">College of Computing and Informatics</option>
                                        <option value="College of Engineering">College of Engineering</option>
                                        <option value="College of Business">College of Business</option>
                                        <option value="College of Science">College of Science</option>
                                        <option value="College of Arts and Social Sciences">College of Arts and Social Sciences</option>
                                        <option value="College of Medicine">College of Medicine</option>
                                        <option value="College of Education">College of Education</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Division
                                    </label>
                                    <select
                                        value={staffSettings.division}
                                        onChange={(e) => setStaffSettings({ ...staffSettings, division: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select division</option>
                                        <option value="Academic Division">Academic Division</option>
                                        <option value="Administrative Division">Administrative Division</option>
                                        <option value="Research Division">Research Division</option>
                                        <option value="Student Affairs Division">Student Affairs Division</option>
                                        <option value="Finance Division">Finance Division</option>
                                        <option value="Human Resources Division">Human Resources Division</option>
                                        <option value="IT Services Division">IT Services Division</option>
                                        <option value="Library Services Division">Library Services Division</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex space-x-4">
                                    <Button className="flex-1">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Add Staff Member
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Staff Settings
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Status */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                        <CardDescription>Current system information and status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">Online</p>
                                <p className="text-sm text-gray-600">System Status</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">v1.0.0</p>
                                <p className="text-sm text-gray-600">Version</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">99.9%</p>
                                <p className="text-sm text-gray-600">Uptime</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}