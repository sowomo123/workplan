"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@workspace/ui/components/navigation-menu";
import { Users, FileText, Settings, TrendingUp, Clock, CheckCircle, AlertCircle, Star, Eye, Edit, ChevronDown, Printer, Save, Plus } from "lucide-react";

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

interface PerformanceAssessmentProps {
    user: User;
}

export function PerformanceAssessment({ user }: PerformanceAssessmentProps) {
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
    const [inputValues, setInputValues] = useState<{ [key: string]: { [field: string]: string } }>({});
    const [visibleRows, setVisibleRows] = useState(13);

    const userProfile = {
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
        email: user.email,
    };

    const toggleDropdown = (rowId: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const selectValue = (rowId: string, value: string) => {
        setSelectedValues(prev => ({
            ...prev,
            [rowId]: value
        }));
        toggleDropdown(rowId);
    };

    const updateInputValue = (rowId: string, field: string, value: string) => {
        setInputValues(prev => ({
            ...prev,
            [rowId]: {
                ...prev[rowId],
                [field]: value
            }
        }));
    };

    const getInputValue = (rowId: string, field: string, defaultValue: string = '') => {
        return inputValues[rowId]?.[field] || defaultValue;
    };

    const addNewRow = () => {
        if (visibleRows < 20) {
            setVisibleRows(prev => prev + 1);
        }
    };

    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Performance Assessment Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .header h1 { color: #1f2937; margin-bottom: 5px; }
                        .header p { color: #6b7280; margin: 0; }
                        .user-info { margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; font-size: 12px; }
                        th { background-color: #f3f4f6; font-weight: bold; }
                        .print-date { text-align: right; margin-top: 20px; font-size: 12px; color: #6b7280; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Performance Assessment Report</h1>
                        <p>Individual Work Plan Performance Evaluation</p>
                    </div>
                    
                    <div class="user-info">
                        <strong>Staff Member:</strong> ${userProfile.name}<br>
                        <strong>Email:</strong> ${userProfile.email}<br>
                        <strong>Assessment Date:</strong> ${new Date().toLocaleDateString()}
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>College/Section</th>
                                <th>Activities</th>
                                <th>Unit</th>
                                <th>Target Values</th>
                                <th>Target Achieved</th>
                                <th>Staff Feedback</th>
                                <th>Final Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${performanceTableData.map(assessment => `
                                <tr>
                                    <td>${assessment.sl}</td>
                                    <td>${getInputValue(assessment.id, 'collegeSection', assessment.collegeSection)}</td>
                                    <td>${getInputValue(assessment.id, 'activities', assessment.activities)}</td>
                                    <td>${getInputValue(assessment.id, 'unit', assessment.unit)}</td>
                                    <td>${selectedValues[assessment.id] || getInputValue(assessment.id, 'targetValues', assessment.targetValues)}</td>
                                    <td>${getInputValue(assessment.id, 'targetAchieved', assessment.targetAchieved)}</td>
                                    <td>${getInputValue(assessment.id, 'staffFeedback', assessment.staffFeedback)}</td>
                                    <td>${getInputValue(assessment.id, 'finalScore', assessment.finalScore)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="print-date">
                        Report generated on: ${new Date().toLocaleString()}
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(printContent);
            printWindow.document.close();

            // Wait for content to load then print
            printWindow.onload = () => {
                printWindow.print();
                printWindow.close();
            };
        }
    };

    const handleSave = () => {
        // Prepare the assessment data for saving
        const assessmentData = {
            staffMember: {
                name: userProfile.name,
                email: userProfile.email,
            },
            assessmentDate: new Date().toISOString(),
            assessments: performanceTableData.map(assessment => ({
                id: assessment.id,
                sl: assessment.sl,
                collegeSection: getInputValue(assessment.id, 'collegeSection', assessment.collegeSection),
                activities: getInputValue(assessment.id, 'activities', assessment.activities),
                unit: getInputValue(assessment.id, 'unit', assessment.unit),
                targetValues: selectedValues[assessment.id] || getInputValue(assessment.id, 'targetValues', assessment.targetValues),
                targetAchieved: getInputValue(assessment.id, 'targetAchieved', assessment.targetAchieved),
                staffFeedback: getInputValue(assessment.id, 'staffFeedback', assessment.staffFeedback),
                finalScore: getInputValue(assessment.id, 'finalScore', assessment.finalScore),
                ratingSelection: selectedValues[assessment.id] || null
            })),
            selectedValues,
            inputValues
        };

        // In a real application, you would send this data to your backend API
        console.log('Saving assessment data:', assessmentData);

        // For now, we'll save to localStorage as a demo
        try {
            localStorage.setItem(`performance_assessment_${user.id}_${Date.now()}`, JSON.stringify(assessmentData));
            alert('Assessment saved successfully!');
        } catch (error) {
            console.error('Error saving assessment:', error);
            alert('Error saving assessment. Please try again.');
        }
    };    // Predefined college/section options
    const collegeSectionOptions = [
        "Academics with Masters currently on campus",
        "Academics with PhD currently on campus",
        "International academics / Experts engaged",
        "Regular Professional Development Programme",
        "Quality of Administrative Services",
        "Quality of HR Services",
        "Features of Human Resource Management Module Used",
        "Academics having qualification in teaching higher education",
        "Academics enrolled in various long-term PD programme",
        "SOP and TAT implemented for all HR services",
        "APA ACTIVITIES",
        "Transparent/accountable & Integrity consciousness & culture strengthened",
        "College Activities"
    ];

    // Predefined activities options
    const activitiesOptions = [
        "Record of Masters faculty",
        "Record of PhD faculty",
        "Number",
        "Online seminars/webinars, face to face",
        "Staff Satisfaction",
        "Staff Survey Report",
        "Staff Profile, Staff Education, Recruitment, Appointments, Resignation",
        "Faculty with PgCHE",
        "Record of faculty who have availed long term PD",
        "1. Dedicated Service Award, 2. Recruitment & Selection, 3. Resignation & Superannuation, 4. Annual Increment",
        "APA Activities: 1. Evidences Maintained Accurately, 2. Guidelines Template Followed, 3. Submission of Evidences on Time, 4. Updated APA 2025-2026",
        "AD focal person, Timely Asset Declaration, Feedback option, Integrity Vetting, Declaration of Conflict of Interest etc.",
        ""
    ];

    // Create 20 empty rows for user input
    const performanceTableData = Array.from({ length: 20 }, (_, index) => ({
        id: (index + 1).toString(),
        sl: index + 1,
        collegeSection: index < collegeSectionOptions.length ? collegeSectionOptions[index] : "",
        activities: index < activitiesOptions.length ? activitiesOptions[index] : "",
        unit: "",
        targetValues: "",
        targetAchieved: "",
        staffFeedback: "",
        finalScore: ""
    }));

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

    const getRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`w-4 h-4 ${index < fullStars
                            ? "text-yellow-400 fill-yellow-400"
                            : index === fullStars && hasHalfStar
                                ? "text-yellow-400 fill-yellow-200"
                                : "text-gray-300"
                            }`}
                    />
                ))}
                <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Performance Assessment</h1>
                            <p className="text-gray-600">Manage and review staff performance assessments</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Assessment
                            </Button>
                            <Button variant="outline" size="sm" onClick={handlePrint}>
                                <Printer className="w-4 h-4 mr-2" />
                                Print Report
                            </Button>
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
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-blue-600 bg-blue-50"
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
                    {/* Performance Assessment Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Performance Assessment Details</CardTitle>
                            <CardDescription>Detailed performance assessment with targets and achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">SL</TableHead>
                                            <TableHead>College/Section</TableHead>
                                            <TableHead>Activities</TableHead>
                                            <TableHead className="text-center">Unit</TableHead>
                                            <TableHead className="text-center">Target Values</TableHead>
                                            <TableHead className="text-center">Rating Options</TableHead>
                                            <TableHead className="text-center">Target Achieved</TableHead>
                                            <TableHead>Staff Feedback</TableHead>
                                            <TableHead className="text-center">Final Score</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {performanceTableData.slice(0, visibleRows).map((assessment) => (
                                            <TableRow key={assessment.id}>
                                                <TableCell className="text-center font-medium">{assessment.sl}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="text-sm">
                                                        {assessment.collegeSection ? (
                                                            <span>{assessment.collegeSection}</span>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                placeholder="Enter college/section"
                                                                className="w-full border-none bg-transparent focus:outline-none"
                                                                value={getInputValue(assessment.id, 'collegeSection')}
                                                                onChange={(e) => updateInputValue(assessment.id, 'collegeSection', e.target.value)}
                                                            />
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {assessment.activities ? (
                                                            <span>{assessment.activities}</span>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                placeholder="Enter activities"
                                                                className="w-full border-none bg-transparent focus:outline-none"
                                                                value={getInputValue(assessment.id, 'activities')}
                                                                onChange={(e) => updateInputValue(assessment.id, 'activities', e.target.value)}
                                                            />
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Unit"
                                                        className="w-full border-none bg-transparent focus:outline-none text-center"
                                                        value={getInputValue(assessment.id, 'unit', assessment.unit)}
                                                        onChange={(e) => updateInputValue(assessment.id, 'unit', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="text-sm font-medium">
                                                        {selectedValues[assessment.id] || (
                                                            <input
                                                                type="text"
                                                                placeholder="Target"
                                                                className="w-full border-none bg-transparent focus:outline-none text-center"
                                                                value={getInputValue(assessment.id, 'targetValues', assessment.targetValues)}
                                                                onChange={(e) => updateInputValue(assessment.id, 'targetValues', e.target.value)}
                                                            />
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                        <div className="relative">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs px-2 py-1 h-auto bg-green-50 border-green-200 text-green-700 hover:bg-green-100 flex items-center gap-1"
                                                                onClick={() => toggleDropdown(`ot-${assessment.id}`)}
                                                            >
                                                                OT
                                                                <ChevronDown className="w-3 h-3" />
                                                            </Button>
                                                            {openDropdowns[`ot-${assessment.id}`] && (
                                                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50 border-b border-gray-100"
                                                                        onClick={() => selectValue(assessment.id, '100-95')}
                                                                    >
                                                                        100-95
                                                                    </button>
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                                                                        onClick={() => selectValue(assessment.id, '100-85')}
                                                                    >
                                                                        100-85
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs px-2 py-1 h-auto bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
                                                                onClick={() => toggleDropdown(`vg-${assessment.id}`)}
                                                            >
                                                                VG
                                                                <ChevronDown className="w-3 h-3" />
                                                            </Button>
                                                            {openDropdowns[`vg-${assessment.id}`] && (
                                                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50 border-b border-gray-100"
                                                                        onClick={() => selectValue(assessment.id, '94.99-90')}
                                                                    >
                                                                        94.99-90
                                                                    </button>
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                                                                        onClick={() => selectValue(assessment.id, '90-99')}
                                                                    >
                                                                        90-99
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs px-2 py-1 h-auto bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 flex items-center gap-1"
                                                                onClick={() => toggleDropdown(`good-${assessment.id}`)}
                                                            >
                                                                Good
                                                                <ChevronDown className="w-3 h-3" />
                                                            </Button>
                                                            {openDropdowns[`good-${assessment.id}`] && (
                                                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50 border-b border-gray-100"
                                                                        onClick={() => selectValue(assessment.id, '89.99-85')}
                                                                    >
                                                                        89.99-85
                                                                    </button>
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                                                                        onClick={() => selectValue(assessment.id, '80-90')}
                                                                    >
                                                                        80-90
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="relative">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs px-2 py-1 h-auto bg-red-50 border-red-200 text-red-700 hover:bg-red-100 flex items-center gap-1"
                                                                onClick={() => toggleDropdown(`ni-${assessment.id}`)}
                                                            >
                                                                NI
                                                                <ChevronDown className="w-3 h-3" />
                                                            </Button>
                                                            {openDropdowns[`ni-${assessment.id}`] && (
                                                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50 border-b border-gray-100"
                                                                        onClick={() => selectValue(assessment.id, '84.99-80')}
                                                                    >
                                                                        84.99-80
                                                                    </button>
                                                                    <button
                                                                        className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                                                                        onClick={() => selectValue(assessment.id, '80-70')}
                                                                    >
                                                                        80-70
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Achieved"
                                                        className="w-full border-none bg-transparent focus:outline-none text-center"
                                                        value={getInputValue(assessment.id, 'targetAchieved', assessment.targetAchieved)}
                                                        onChange={(e) => updateInputValue(assessment.id, 'targetAchieved', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter staff feedback"
                                                        className="w-full border-none bg-transparent focus:outline-none"
                                                        value={getInputValue(assessment.id, 'staffFeedback', assessment.staffFeedback)}
                                                        onChange={(e) => updateInputValue(assessment.id, 'staffFeedback', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Score"
                                                        className="w-full border-none bg-transparent focus:outline-none text-center"
                                                        value={getInputValue(assessment.id, 'finalScore', assessment.finalScore)}
                                                        onChange={(e) => updateInputValue(assessment.id, 'finalScore', e.target.value)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Add Row Button */}
                            {visibleRows < 20 && (
                                <div className="flex justify-center mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addNewRow}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Row ({visibleRows}/20)
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Summary Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{visibleRows}</div>
                                <p className="text-xs text-muted-foreground">
                                    Assessment activities
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Targets Met</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Activities meeting targets
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Below Target</CardTitle>
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Activities below target
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0.0</div>
                                <p className="text-xs text-muted-foreground">
                                    Overall performance score
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}