import { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  MessageSquare, 
  Trophy, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  CheckCircle,
  Clock,
  RefreshCw,
  Users,
  Mail,
  Calendar
} from 'lucide-react';

export default function TeamDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Submit Video', icon: Video },
    { name: 'Feedback', icon: MessageSquare },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Chat Support', icon: HelpCircle },
    { name: 'Logout', icon: LogOut },
  ];

  const teamInfo = {
    name: 'Code Warriors',
    members: 5,
    email: 'codewarriors@team.com',
    registeredDate: 'Oct 1, 2025'
  };

  const statusCards = [
    {
      title: 'Registration Completed',
      status: 'completed',
      icon: CheckCircle,
      emoji: '✅',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      description: 'Team successfully registered'
    },
    {
      title: 'Submission Pending',
      status: 'pending',
      icon: Clock,
      emoji: '⏳',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      description: 'Video submission awaited'
    },
    {
      title: 'Evaluation In Progress',
      status: 'progress',
      icon: RefreshCw,
      emoji: '🔄',
      color: 'from-blue-400 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      description: 'Your work is being reviewed'
    }
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-indigo-600 to-purple-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-indigo-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xl font-bold text-white">Team Portal</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.name;
              const isLogout = item.name === 'Logout';

              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : isLogout
                      ? 'text-red-200 hover:bg-red-500 hover:text-white'
                      : 'text-white hover:bg-indigo-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="px-6 py-4 border-t border-indigo-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                CW
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{teamInfo.name}</p>
                <p className="text-xs text-indigo-200 truncate">{teamInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">{activeMenu}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Thursday, Oct 2, 2025</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {teamInfo.name}! 👋</h2>
                <p className="text-indigo-100 text-lg">
                  Great to see you again. Let's make today productive!
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 min-w-max">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Team Members</span>
                </div>
                <p className="text-3xl font-bold">{teamInfo.members}</p>
              </div>
            </div>
          </div>

          {/* Team Details Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-indigo-600" />
              Team Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Team Name</p>
                  <p className="font-semibold text-gray-800">{teamInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800 text-sm">{teamInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Registered</p>
                  <p className="font-semibold text-gray-800">{teamInfo.registeredDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statusCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className={`${card.bgColor} rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl">{card.emoji}</span>
                      </div>
                      <h4 className={`text-lg font-bold ${card.textColor} mb-2`}>
                        {card.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{card.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className={`text-xs font-semibold ${card.textColor} uppercase tracking-wide`}>
                          {card.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                <Video className="w-5 h-5" />
                <span className="font-medium">Submit Video</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">View Feedback</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Leaderboard</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg">
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Get Support</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}