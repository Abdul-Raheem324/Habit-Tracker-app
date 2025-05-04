import React, { useState, useEffect, SetStateAction } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Sun,
  Moon,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Sparkles,
  X,
  PlusCircle,
  Menu,
} from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface WeeklyStat {
  day: string;
  [key: string]: any;
}

// Sample data
const motivationalQuotes = [
  "The secret of getting ahead is getting started.",
  "Quality is not an act, it's a habit.",
  "Small daily improvements over time lead to stunning results.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Motivation gets you going, but habit gets you there.",
  "Habits are the compound interest of self-improvement.",
  "You don't have to be great to start, but you have to start to be great.",
  "We first make our habits, and then our habits make us.",
  "Your habits will determine your future.",
];

const initialHabits: Habit[] = [
  {
    id: 1,
    name: "Exercise",
    description: "30 minutes of physical activity",
    target: 30,
    category: "Health",
    color: "#4CAF50",
    icon: "activity",
    streak: 3,
    lastUpdated: "2025-05-03T00:00:00Z",
    history: [
      { date: "2025-04-27", value: 20 },
      { date: "2025-04-28", value: 25 },
      { date: "2025-04-29", value: 30 },
      { date: "2025-04-30", value: 35 },
      { date: "2025-05-01", value: 40 },
      { date: "2025-05-02", value: 45 },
      { date: "2025-05-03", value: 50 },
    ],
  },
  {
    id: 2,
    name: "Reading",
    description: "Read books or articles",
    target: 20,
    category: "Learning",
    color: "#2196F3",
    icon: "book",
    streak: 5,
    lastUpdated: "2025-05-03T00:00:00Z",
    history: [
      { date: "2025-04-27", value: 10 },
      { date: "2025-04-28", value: 15 },
      { date: "2025-04-29", value: 20 },
      { date: "2025-04-30", value: 25 },
      { date: "2025-05-01", value: 30 },
      { date: "2025-05-02", value: 35 },
      { date: "2025-05-03", value: 40 },
    ],
  },
  {
    id: 3,
    name: "Meditation",
    description: "Mindfulness meditation",
    target: 10,
    category: "Mental Health",
    color: "#9C27B0",
    icon: "activity",
    streak: 2,
    lastUpdated: "2025-05-03T00:00:00Z",
    history: [
      { date: "2025-04-27", value: 5 },
      { date: "2025-04-28", value: 10 },
      { date: "2025-04-29", value: 15 },
      { date: "2025-04-30", value: 20 },
      { date: "2025-05-01", value: 25 },
      { date: "2025-05-02", value: 30 },
      { date: "2025-05-03", value: 35 },
    ],
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BFF",
  "#FF6B6B",
  "#4CAF50",
  "#9C27B0",
];

// Components
interface NavbarProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
  onToggleTheme: () => void;
  theme: "light" | "dark";
}
const Navbar = ({
  onNavigate,
  activeTab,
  onToggleTheme,
  theme,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavigation = (tab: string) => {
    onNavigate(tab);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const navTabs = ["home", "dashboard", "statistics"];

  return (
    <>
      <motion.nav
        className={`flex items-center justify-between p-4 shadow-md sticky top-0 z-50 
            ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-white"
            }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <motion.div
            className="cursor-pointer"
            onClick={() => handleNavigation("home")}
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </motion.div>
          <motion.h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => handleNavigation("home")}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            HabitSpark
          </motion.h1>
        </div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden md:flex space-x-4 flex-1 justify-center">
          {navTabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleNavigation(tab)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Right Section (Theme and Profile) */}
        <div className="flex items-center space-x-3 justify-end">
          {/* Theme Toggle Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden fixed top-16 left-0 right-0 z-40 max-h-[60vh] overflow-y-auto shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 space-y-3">
              {navTabs.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => handleNavigation(tab)}
                  className={`px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface LandingSectionProps {
  onGetStarted: () => void;
  theme: string;
}

const LandingSection: React.FC<LandingSectionProps> = ({
  onGetStarted,
  theme,
}) => {
  const scrollVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      className={`relative text-center py-20 px-6 overflow-hidden ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-100 via-purple-50 to-purple-200"
          : "bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={scrollVariants}
    >
      <motion.div
        className={`absolute w-64 h-64 rounded-full ${
          theme === "light"
            ? "bg-purple-200 opacity-30"
            : "bg-purple-700 opacity-20"
        }`}
        style={{ top: "10%", right: "5%" }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className={`absolute w-40 h-40 rounded-full ${
          theme === "light"
            ? "bg-blue-200 opacity-40"
            : "bg-blue-700 opacity-20"
        }`}
        style={{ bottom: "15%", left: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <motion.h2
        className={`text-5xl font-extrabold mb-4 ${
          theme === "light" ? "text-gray-800" : "text-white"
        } z-10 relative`}
        variants={childVariants}
      >
        Track. Improve. Achieve.
      </motion.h2>
      <motion.p
        className={`text-lg max-w-xl mx-auto mb-8 ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        } z-10 relative`}
        variants={childVariants}
      >
        HabitSpark helps you build positive habits, stay consistent, and
        visualize your progress with beautiful insights.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 mt-6 z-10 relative"
        variants={childVariants}
      >
        <motion.button
          className={`px-6 py-3 rounded-lg font-medium shadow-lg transition-colors ${
            theme === "light"
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </motion.section>
  );
};
interface FeaturesSectionProps {
  theme: "light" | "dark";
}

const features = [
  {
    title: "Track Your Habits",
    description:
      "Easily monitor your daily habits and stay consistent with your goals.",
    icon: "📊",
  },
  {
    title: "Beautiful Insights",
    description: "Visualize your progress with stunning charts and analytics.",
    icon: "📈",
  },
  {
    title: "Stay Motivated",
    description:
      "Receive reminders and motivational quotes to keep you on track.",
    icon: "💪",
  },
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ theme }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      className={`py-20 px-6 ${
        theme === "light"
          ? "bg-gradient-to-b from-blue-50 to-gray-100"
          : "bg-gray-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h3
        className={`text-4xl font-extrabold text-center mb-8 ${
          theme === "light" ? "text-indigo-800" : "text-white"
        }`}
      >
        Features You'll Love
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center ${
              theme === "light"
                ? "bg-white text-gray-800 border border-gray-200"
                : "bg-gray-800 text-white"
            }`}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-5xl text-indigo-600 mb-4">{feature.icon}</div>
            <h4 className="text-2xl font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

interface QuoteWidgetProps {
  quote: string;
  onRefresh: () => void;
  theme: string;
}

const QuoteWidget: React.FC<QuoteWidgetProps> = ({
  quote,
  onRefresh,
  theme,
}) => {
  return (
    <motion.div
      className={`shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-6 border-l-4 transition-colors ${
        theme === "light"
          ? "bg-gray-50 border border-gray-200 border-purple-500"
          : "bg-gray-800 border-purple-600"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        boxShadow:
          theme === "light"
            ? "0px 10px 25px rgba(124, 58, 237, 0.2)"
            : "0px 10px 25px rgba(124, 58, 237, 0.15)",
        y: -5,
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className={`text-xl font-serif italic leading-relaxed ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span
                  className={`text-4xl font-serif ${
                    theme === "light" ? "text-purple-600" : "text-purple-400"
                  }`}
                >
                  "
                </span>
                <span
                  className={`bg-clip-text text-transparent ${
                    theme === "light"
                      ? "bg-gradient-to-r from-purple-500 to-blue-600"
                      : "bg-gradient-to-r from-purple-400 to-blue-300"
                  }`}
                >
                  {quote}
                </span>
                <span
                  className={`text-4xl font-serif ${
                    theme === "light" ? "text-purple-600" : "text-purple-400"
                  }`}
                >
                  "
                </span>
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.button
          onClick={onRefresh}
          className={`p-2 ml-4 rounded-full transition-colors ${
            theme === "light"
              ? "bg-purple-100 text-purple-600 hover:text-purple-700"
              : "bg-purple-900/30 text-purple-400 dark:hover:text-purple-300"
          }`}
          whileHover={{
            scale: 1.2,
            rotate: 180,
            backgroundColor:
              theme === "light"
                ? "rgba(229, 231, 235, 0.5)"
                : "rgba(139, 92, 246, 0.3)",
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            rotate: { duration: 0.5, ease: "easeOut" },
          }}
        >
          <RefreshCw className="h-5 w-5" />
        </motion.button>
      </div>
      <motion.div
        className={`w-full h-1 mt-4 rounded-full ${
          theme === "light"
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gradient-to-r from-purple-400 to-blue-300"
        }`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.7 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
};

interface Habit {
  id: number;
  name: string;
  description: string;
  target: number;
  streak: number;
  color: string;
  icon: string;
  category: string; // Added category property
  history: { date: string; value: number }[];
  lastUpdated: string; // Added lastUpdated property
}

const calculateStreak = (
  history: { date: string; value: number }[],
  target: number
): number => {
  if (!history || history.length === 0) return 0;

  // Sort history by date (descending - most recent first)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Check if the most recent entry is from today and meets the target
  const mostRecent = sortedHistory[0];
  const isToday = mostRecent.date === today;
  const targetMet = mostRecent.value >= target;

  // If today's entry doesn't meet the target, check previous days
  if (isToday && !targetMet) {
    // Start counting from yesterday
    return countConsecutiveDays(sortedHistory.slice(1), target);
  }

  // Count consecutive days where target was met
  return countConsecutiveDays(sortedHistory, target);
};

const countConsecutiveDays = (
  sortedHistory: { date: string; value: number }[],
  target: number
): number => {
  if (sortedHistory.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date(sortedHistory[0].date);

  for (let i = 0; i < sortedHistory.length; i++) {
    const entry = sortedHistory[i];
    const entryDate = new Date(entry.date);

    // If this is the first entry or the expected next consecutive day
    if (i === 0 || isConsecutiveDay(currentDate, entryDate)) {
      // Check if target was met
      if (entry.value >= target) {
        streak++;
        currentDate = entryDate;
      } else {
        // Break the streak if target wasn't met
        break;
      }
    } else {
      // Break the streak if there's a gap in days
      break;
    }
  }

  return streak;
};
const isConsecutiveDay = (d1: Date, d2: Date): boolean => {
  // Calculate the difference in days
  const diffTime = d1.getTime() - d2.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Check if d2 is exactly one day before d1
  return diffDays === 1;
};

interface Habit {
  id: number;
  name: string;
  description: string;
  target: number;
  category: string;
  color: string;
  icon: string;
  streak: number;
  lastUpdated: string;
  history: { date: string; value: number }[];
}
const HabitCard: React.FC<{
  habit: Habit;
  onUpdateProgress: (id: number, value: number, streak: number) => void;
  onEdit: (habit: Habit) => void;
  theme: string;
}> = ({ habit, onUpdateProgress, onEdit, theme }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Calculate current streak based on the history
  const [currentStreak, setCurrentStreak] = useState(() =>
    calculateStreak(habit.history, habit.target)
  );

  const todayEntry = habit.history.find((entry) => entry.date === today);
  const todayValue = todayEntry?.value || 0;

  // Calculate progress percentage
  const progressPercentage = Math.min((todayValue / habit.target) * 100, 100);

  // Update streak calculation when habit history changes
  useEffect(() => {
    const calculatedStreak = calculateStreak(habit.history, habit.target);
    setCurrentStreak(calculatedStreak);
  }, [habit.history, habit.target]);

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return "text-green-500 dark:text-green-400";
    if (percentage >= 75) return "text-blue-500 dark:text-blue-400";
    if (percentage >= 50) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const handleUpdateProgress = (newValue: number) => {
    const updatedValue = Math.max(0, newValue);
    const updatedHistory = [...habit.history];

    // Find today's entry index
    const todayEntryIndex = updatedHistory.findIndex(
      (entry) => entry.date === today
    );

    // Update or add today's entry
    if (todayEntryIndex >= 0) {
      updatedHistory[todayEntryIndex] = {
        ...updatedHistory[todayEntryIndex],
        value: updatedValue,
      };
    } else {
      updatedHistory.push({ date: today, value: updatedValue });
    }

    // Check if today's target is now met and update the streak locally
    if (
      updatedValue >= habit.target &&
      (!todayEntry || todayEntry.value < habit.target)
    ) {
      setCurrentStreak((prevStreak) => prevStreak + 1);
    } else {
      // Otherwise, recalculate the streak based on the updated history
      const newStreak = calculateStreak(updatedHistory, habit.target);
      setCurrentStreak(newStreak);
    }

    // Call the parent handler with the updated progress and streak
    const newStreak = calculateStreak(updatedHistory, habit.target);
    onUpdateProgress(habit.id, updatedValue, newStreak);
  };

  return (
    <motion.div
      className={`shadow-md rounded-lg p-4 mb-4 transition-colors ${
        theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-gray-800"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow:
          theme === "light"
            ? "0px 10px 20px rgba(0, 0, 0, 0.15)"
            : "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <motion.h3
          className={`text-lg font-medium ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {habit.name}
        </motion.h3>
        <motion.button
          onClick={() => onEdit(habit)}
          className={`p-1 rounded-full ${
            theme === "light"
              ? "text-gray-500 hover:text-gray-700"
              : "dark:text-gray-500 dark:hover:text-gray-400"
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit2 className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Description */}
      <motion.p
        className={`text-sm ${
          theme === "light" ? "text-gray-600" : "dark:text-gray-400"
        } mb-3`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {habit.description}
      </motion.p>

      {/* Target and Streak */}
      <motion.div
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span
          className={`text-sm font-medium ${
            theme === "light" ? "text-gray-600" : "dark:text-gray-400"
          }`}
        >
          Target: {habit.target} minutes
        </span>
        <span
          className={`text-sm font-medium ${
            todayValue >= habit.target
              ? "text-green-500"
              : theme === "light"
              ? "text-gray-600"
              : "dark:text-gray-400"
          }`}
        >
          Streak: {currentStreak} days
          {todayValue >= habit.target && " 🔥"}
        </span>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className={`rounded-full h-2 mb-4 ${
          theme === "light" ? "bg-gray-200" : "dark:bg-gray-700"
        }`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`rounded-full h-2 ${
            progressPercentage >= 100
              ? "bg-green-500"
              : theme === "light"
              ? "bg-indigo-500"
              : "dark:bg-indigo-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span
          className={`text-sm font-medium ${getProgressColor(
            todayValue,
            habit.target
          )}`}
        >
          {todayValue} / {habit.target} minutes
        </span>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => handleUpdateProgress(todayValue - 5)}
            className={`p-1 rounded-full transition-colors ${
              theme === "light"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={todayValue <= 0}
          >
            <XCircle
              className={`h-4 w-4 ${todayValue <= 0 ? "opacity-50" : ""}`}
            />
          </motion.button>
          <motion.button
            onClick={() => handleUpdateProgress(todayValue + 5)}
            className={`p-1 rounded-full transition-colors ${
              theme === "light"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <CheckCircle className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface DashboardProps {
  habits: Habit[];
  onUpdateProgress: (id: number, value: number, streak: number) => void;
  onAddHabit: () => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: number) => void;
  theme: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  habits,
  onUpdateProgress,
  onAddHabit,
  onEditHabit,
  onDeleteHabit,
  theme,
}) => {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>(habits);
  const [filter, setFilter] = useState<string>("all");

  // Update filtered habits when habits or filter changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredHabits(habits);
    } else {
      setFilteredHabits(
        habits.filter(
          (habit) => habit.category.toLowerCase() === filter.toLowerCase()
        )
      );
    }
  }, [habits, filter]);

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(habits.map((habit) => habit.category.toLowerCase())),
  ];

  // Handle habit progress update
  const handleUpdateProgress = (id: number, value: number, streak: number) => {
    // Call the parent handler with updated streak
    onUpdateProgress(id, value, streak);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <motion.h2
              className={`text-2xl font-bold ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Habits
            </motion.h2>
            <motion.button
              onClick={onAddHabit}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                theme === "light"
                  ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  : "dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Habit
            </motion.button>
          </div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                  filter === category
                    ? theme === "light"
                      ? "bg-indigo-100 text-indigo-700"
                      : "dark:bg-indigo-900 dark:text-indigo-300"
                    : theme === "light"
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Habit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onUpdateProgress={handleUpdateProgress}
                onEdit={onEditHabit}
                theme={theme}
              />
            ))}
            {filteredHabits.length === 0 && (
              <motion.div
                className={`col-span-full text-center py-8 ${
                  theme === "light" ? "text-gray-500" : "dark:text-gray-400"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No habits found. Add a new habit to get started!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChartSectionProps {
  habits: {
    id: number;
    name: string;
    color: string;
    history: { date: string; value: number }[];
  }[];
  timeframe: "week" | "month";
  onTimeframeChange: (timeframe: "week" | "month") => void;
  theme: "light" | "dark";
}

const ChartSection: React.FC<ChartSectionProps> = ({
  habits,
  timeframe,
  onTimeframeChange,
  theme,
}) => {
  const getDayLabel = (date: string) => {
    try {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayDate = new Date(date);

      // Validate the date is valid before getting day
      if (isNaN(dayDate.getTime())) {
        return "Invalid";
      }

      return days[dayDate.getDay()];
    } catch (error) {
      console.error("Error formatting day label:", error);
      return "Invalid";
    }
  };

  const getWeekNumber = (date: Date): number => {
    try {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor(
        (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
      );
      return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    } catch (error) {
      console.error("Error calculating week number:", error);
      return 0;
    }
  };

  const prepareChartData = () => {
    if (timeframe === "week") {
      // Get today and previous 6 days for week view
      const today = new Date();
      const dates = [];

      // Generate dates for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
        dates.push(formattedDate);
      }

      // Create formatted data array with all habits for each date
      const formattedData = dates.map((date) => {
        const dataPoint: {
          date: string;
          day: string;
          [key: string]: number | string;
        } = {
          date,
          day: getDayLabel(date),
        };

        // Add value for each habit
        habits.forEach((habit) => {
          const historyEntry = habit.history.find((h) => h.date === date);
          dataPoint[habit.name] = historyEntry ? historyEntry.value : 0;
        });

        return dataPoint;
      });

      return formattedData;
    } else if (timeframe === "month") {
      // Initialize weeks data structure
      const weeksData: Record<
        string,
        { week: string; weekNumber: number; [key: string]: number | string }
      > = {};
      const today = new Date();

      // Create a mapping for the past 5 weeks
      for (let i = 4; i >= 0; i--) {
        const weekDate = new Date(today);
        weekDate.setDate(today.getDate() - i * 7);
        const weekNum = getWeekNumber(weekDate);
        const weekLabel = `Week ${weekNum}`;

        weeksData[weekLabel] = {
          week: weekLabel,
          weekNumber: weekNum, // Store numeric week for sorting
          // Initialize all habits with 0
          ...habits.reduce((acc: Record<string, number>, habit) => {
            acc[habit.name as string] = 0;
            return acc;
          }, {}),
        };
      }

      // Process all habits
      habits.forEach((habit) => {
        habit.history.forEach((entry) => {
          try {
            const entryDate = new Date(entry.date);

            // Skip invalid dates
            if (isNaN(entryDate.getTime())) {
              console.warn(
                `Invalid date found in habit history: ${entry.date}`
              );
              return;
            }

            const weekNum = getWeekNumber(entryDate);
            const weekLabel = `Week ${weekNum}`;

            // Only update if this week is in our data structure
            if (weeksData[weekLabel]) {
              weeksData[weekLabel][habit.name] =
                (Number(weeksData[weekLabel][habit.name]) || 0) + entry.value;
            }
          } catch (error) {
            console.error("Error processing habit history:", error);
          }
        });
      });

      // Convert to array and sort by week number
      const formattedData = Object.values(weeksData).sort(
        (a, b) => a.weekNumber - b.weekNumber
      );

      return formattedData;
    }

    return [];
  };

  // Get the prepared chart data
  const chartData = prepareChartData();

  return (
    <motion.div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-colors ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <motion.div
        className={`shadow-md rounded-lg p-6 transition-colors ${
          theme === "light"
            ? "bg-gray-50 border border-gray-200"
            : "bg-gray-800"
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className={`text-xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Progress Chart
          </motion.h2>
          <motion.div
            className="inline-flex rounded-md shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Week Button */}
            <motion.button
              onClick={() => onTimeframeChange("week")}
              className={`${
                timeframe === "week"
                  ? theme === "light"
                    ? "bg-indigo-200 text-indigo-700"
                    : "bg-indigo-900 text-indigo-300"
                  : theme === "light"
                  ? "bg-white text-gray-700 border-gray-300"
                  : "bg-gray-700 text-gray-300"
              } px-4 py-2 text-sm font-medium rounded-l-md border ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Week
            </motion.button>
            <motion.button
              onClick={() => onTimeframeChange("month")}
              className={`${
                timeframe === "month"
                  ? theme === "light"
                    ? "bg-indigo-200 text-indigo-700"
                    : "bg-indigo-900 text-indigo-300"
                  : theme === "light"
                  ? "bg-white text-gray-700 border-gray-300"
                  : "bg-gray-700 text-gray-300"
              } px-4 py-2 text-sm font-medium rounded-r-md border ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              } border-l-0`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Month
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={timeframe === "week" ? "day" : "week"}
                type="category"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {habits.map((habit) => (
                <Line
                  key={habit.id}
                  type="monotone"
                  dataKey={habit.name}
                  name={habit.name}
                  stroke={habit.color}
                  activeDot={{ r: 8 }}
                  connectNulls={true}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
const StatsPage = ({
  habits,
  weeklyStats,
  theme,
}: {
  habits: Habit[];
  weeklyStats: WeeklyStat[];
  theme: string;
}) => {
  // Convert habits to format for pie chart
  const pieChartData = habits.map((habit) => ({
    name: habit.name,
    value: habit.history.reduce((sum, curr) => sum + curr.value, 0),
    color: habit.color,
  }));

  // For bar chart, use the total weekly progress for each habit
  const barChartData = habits.map((habit) => ({
    name: habit.name,
    total:
      habit.history && habit.history.length > 0
        ? habit.history.reduce((sum, curr) => sum + (curr.value || 0), 0) // Default to 0 if value is missing
        : 0, // Default to 0 if history is empty
    target: habit.target * 7, // Weekly target
    color: habit.color,
  }));

  // Calculate completion rates
  const completionData = habits.map((habit) => {
    const totalDays = habit.history.length;
    const completedDays = habit.history.filter(
      (progress) => progress.value >= habit.target
    ).length;
    return {
      name: habit.name,
      rate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
      color: habit.color,
    };
  });

  // Helper function to find habit data in weeklyStats
  const getHabitValueForDay = (habit: Habit, dayStat: WeeklyStat) => {
    // Try different possible property naming formats
    const habitName = habit.name;

    // Check direct property match by name
    if (dayStat[habitName] !== undefined) {
      return dayStat[habitName];
    }

    // Try lowercase name
    const lowerCaseName = habitName.toLowerCase();
    if (dayStat[lowerCaseName] !== undefined) {
      return dayStat[lowerCaseName];
    }

    // Try snake_case version (lowercase with underscores)
    const snakeCaseName = habitName.toLowerCase().replace(/\s+/g, "_");
    if (dayStat[snakeCaseName] !== undefined) {
      return dayStat[snakeCaseName];
    }

    // Try camelCase version
    const camelCaseName = habitName
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
    if (dayStat[camelCaseName] !== undefined) {
      return dayStat[camelCaseName];
    }

    // Last resort - try to find by habit id if it exists in the stat object
    if (habit.id && dayStat[`habit_${habit.id}`] !== undefined) {
      return dayStat[`habit_${habit.id}`];
    }

    // Check if there's an id property that matches
    if (habit.id && dayStat[habit.id] !== undefined) {
      return dayStat[habit.id];
    }

    // If we still can't find it, look for any property that could match
    for (const key in dayStat) {
      // Skip day property
      if (key === "day") continue;

      // If key includes habit name in any form, it might be the right property
      if (
        key.includes(habitName.toLowerCase()) ||
        habitName.toLowerCase().includes(key) ||
        (habit.id && key.includes(habit.id.toString()))
      ) {
        return dayStat[key];
      }
    }

    // If all else fails, return 0
    return 0;
  };

  return (
    <motion.div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-colors ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <h2
        className={`text-3xl font-extrabold mb-8 text-center ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Habit Statistics
      </h2>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Time Distribution */}
        <motion.div
          className={`rounded-lg shadow-md p-6 transition-colors ${
            theme === "light"
              ? "bg-gray-50 border border-gray-200"
              : "bg-gray-800"
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Time Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          className={`rounded-lg shadow-md p-6 transition-colors ${
            theme === "light"
              ? "bg-gray-50 border border-gray-200"
              : "bg-gray-800"
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`text-lg font-medium mb-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Weekly Progress
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Actual" fill="#8884d8">
                  {barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
                <Bar dataKey="target" name="Target" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Completion Rate */}
      <motion.div
        className={`rounded-lg shadow-md p-6 mb-8 transition-colors ${
          theme === "light"
            ? "bg-gray-50 border border-gray-200"
            : "bg-gray-800"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={`text-lg font-medium mb-4 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Completion Rate
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="rate" name="Completion Rate">
                {completionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Weekly Stats Table */}
      <motion.div
        className={`rounded-lg shadow-md p-6 transition-colors ${
          theme === "light"
            ? "bg-gray-50 border border-gray-200"
            : "bg-gray-800"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={`text-lg font-medium mb-4 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Weekly Stats
        </h3>
        {weeklyStats && weeklyStats.length > 0 ? (
          <div className="overflow-x-auto">
            <table
              className={`min-w-full divide-y transition-colors ${
                theme === "light" ? "divide-gray-200" : "dark:divide-gray-700"
              }`}
            >
              <thead
                className={`transition-colors ${
                  theme === "light" ? "bg-gray-100" : "dark:bg-gray-900"
                }`}
              >
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "light" ? "text-gray-600" : "dark:text-gray-400"
                    }`}
                  >
                    Day
                  </th>
                  {habits.map((habit) => (
                    <th
                      key={habit.id}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === "light"
                          ? "text-gray-600"
                          : "dark:text-gray-400"
                      }`}
                    >
                      {habit.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={`transition-colors ${
                  theme === "light"
                    ? "bg-gray-50 divide-gray-200"
                    : "dark:bg-gray-800 dark:divide-gray-700"
                }`}
              >
                {weeklyStats.map((stat, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? theme === "light"
                          ? "bg-gray-50"
                          : "dark:bg-gray-900"
                        : theme === "light"
                        ? "bg-white"
                        : "dark:bg-gray-800"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        theme === "light" ? "text-gray-800" : "dark:text-white"
                      }`}
                    >
                      {stat.day}
                    </td>
                    {habits.map((habit) => {
                      const value = getHabitValueForDay(habit, stat);
                      return (
                        <td
                          key={`${index}-${habit.id}`}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            theme === "light"
                              ? "text-gray-600"
                              : "dark:text-gray-400"
                          }`}
                        >
                          {value !== undefined ? `${value} min` : "0 min"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className={`text-center py-8 ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            No weekly stats available yet.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

interface FooterProps {
  setCurrentView: (view: string) => void;
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView, theme }) => (
  <motion.footer
    className={`py-8 border-t transition-colors ${
      theme === "light"
        ? "bg-gray-50 border-gray-200"
        : "bg-gray-800 border-gray-700"
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="flex items-center mb-4 md:mb-0"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles
              className={`h-5 w-5 mr-2 ${
                theme === "light" ? "text-purple-600" : "text-purple-500"
              }`}
            />
          </motion.div>
          <span
            className={`font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            HabitSpark
          </span>
        </motion.div>

        <div className="flex space-x-6">
          {[
            { name: "Home", view: "home" },
            { name: "Dashboard", view: "dashboard" },
            { name: "Statistics", view: "statistics" },
          ].map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentView(item.view)}
              className={`transition-colors ${
                theme === "light"
                  ? "text-gray-600 hover:text-purple-600"
                  : "text-gray-300 hover:text-purple-500"
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div
        className={`mt-6 text-center md:text-left text-sm ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <p>
          © 2025 HabitSpark. All rights reserved. Built by Mohammed Abdul
          Raheemuddin.
        </p>
        <p>Email : abdulraheemwork324@gmail.com</p>
      </div>
    </div>
  </motion.footer>
);

const HabitModal: React.FC<{
  habit?: Habit;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  onDelete?: () => void;
  isNew: boolean;
  theme: string;
}> = ({ habit, onClose, onSave, onDelete, isNew, theme }) => {
  const [formData, setFormData] = useState({
    id: habit?.id || 0,
    name: habit?.name || "",
    description: habit?.description || "",
    target: habit?.target || 30,
    category: habit?.category || "Health",
    color: habit?.color || "#4CAF50",
    icon: habit?.icon || "✨",
    streak: habit?.streak || 0,
    history: habit?.history || Array(7).fill(0),
  });

  const availableCategories = [
    { name: "Health", emoji: "💪" },
    { name: "Mindfulness", emoji: "🧘" },
    { name: "Productivity", emoji: "📚" },
    { name: "Fitness", emoji: "🏃" },
    { name: "Creativity", emoji: "🎨" },
    { name: "Hydration", emoji: "💧" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, lastUpdated: new Date().toISOString() });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 30 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
      >
        <motion.div
          className={`rounded-xl shadow-xl w-full max-w-lg mx-auto p-6 relative overflow-y-auto max-h-[90vh] transition-colors ${
            theme === "light"
              ? "bg-gray-50 border border-gray-200"
              : "bg-gray-800"
          }`}
          variants={modalVariants}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-2xl font-bold ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              {isNew ? "Add New Habit" : "Edit Habit"}
            </h2>
            <motion.button
              onClick={onClose}
              className={`p-1 rounded-full transition-colors ${
                theme === "light"
                  ? "hover:bg-gray-100 text-gray-500"
                  : "dark:hover:bg-gray-700 dark:text-gray-400"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "dark:text-gray-300"
                }`}
              >
                Habit Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  theme === "light"
                    ? "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                    : "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                }`}
                placeholder="E.g., Morning Run"
                required
              />
            </div>

            <div className="mb-5">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "dark:text-gray-300"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  theme === "light"
                    ? "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                    : "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                }`}
                placeholder="What is this habit about?"
                rows={3}
              />
            </div>
            <div className="mb-5">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "dark:text-gray-300"
                }`}
              >
                Daily Target (minutes)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  min={5}
                  max={120}
                  step={5}
                  className="w-full"
                />
                <span
                  className={`ml-4 font-medium ${
                    theme === "light" ? "text-gray-900" : "dark:text-white"
                  }`}
                >
                  {formData.target} min
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "dark:text-gray-300"
                }`}
              >
                Color
              </label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={`w-full h-10 rounded-lg transition-colors ${
                  theme === "light"
                    ? "border border-gray-300"
                    : "dark:border-gray-600"
                }`}
              />
            </div>

            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "light" ? "text-gray-700" : "dark:text-gray-300"
                }`}
              >
                Category
              </label>
              <div className="grid grid-cols-3 gap-3">
                {availableCategories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, category: cat.name })
                    }
                    className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                      formData.category === cat.name
                        ? theme === "light"
                          ? "bg-indigo-100 border-indigo-500"
                          : "dark:bg-indigo-900 dark:border-indigo-500"
                        : theme === "light"
                        ? "bg-gray-100 border-gray-300"
                        : "dark:bg-gray-700 dark:border-gray-600"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        theme === "light"
                          ? "text-gray-700"
                          : "dark:text-gray-300"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              {!isNew && (
                <motion.button
                  type="button"
                  onClick={onDelete}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Trash2 className="h-5 w-5 mr-1" />
                  Delete
                </motion.button>
              )}
              <div className="flex space-x-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "dark:bg-indigo-600 dark:hover:bg-indigo-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Save
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const getWeeklyStats = (habits: Habit[]): WeeklyStat[] => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the first day of the week (Sunday)

  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const day = daysOfWeek[currentDate.getDay()];

    const stats: WeeklyStat = { day };
    habits.forEach((habit) => {
      const entry = habit.history.find(
        (h) => h.date === currentDate.toISOString().split("T")[0]
      );
      stats[habit.name] = entry ? entry.value : 0;
    });

    return stats;
  });
};

const saveHabitsToLocalStorage = (habits: Habit[]) => {
  try {
    localStorage.setItem("habits", JSON.stringify(habits));
  } catch (error) {
    console.error("Failed to save habits to localStorage:", error);
  }
};

const loadHabitsFromLocalStorage = (initialHabits: Habit[]): Habit[] => {
  try {
    const habitsJSON = localStorage.getItem("habits");
    return habitsJSON ? JSON.parse(habitsJSON) : initialHabits;
  } catch (error) {
    console.error("Failed to load habits from localStorage:", error);
    return initialHabits;
  }
};

const HabitTrackerApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [habits, setHabits] = useState<Habit[]>(
    loadHabitsFromLocalStorage(initialHabits)
  );

  const [currentEditHabit, setCurrentEditHabit] = useState<Habit | null>(null);
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [currentTimeframe, setCurrentTimeframe] = useState<"week" | "month">(
    "week"
  );
  const [quote, setQuote] = useState("");
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    saveHabitsToLocalStorage(habits);
  }, [habits]);
  useEffect(() => {
    setWeeklyStats(getWeeklyStats(habits));
  }, [habits]);

  useEffect(() => {
    const random = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[random]);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const updateHabitProgress = (id: number, value: number) => {
    const today = new Date().toISOString().split("T")[0]; // Get only the date part (e.g., "2025-05-03")

    setHabits((prevHabits) => {
      const updatedHabits = prevHabits.map((habit) => {
        if (habit.id === id) {
          const existingDayIndex = habit.history.findIndex(
            (entry) => entry.date === today
          );

          // If today's date exists, update the progress value
          if (existingDayIndex !== -1) {
            habit.history[existingDayIndex].value = value;
          } else {
            // Otherwise, add a new entry for today
            habit.history.push({ date: today, value });
          }

          // Update streak and lastUpdated timestamp
          return {
            ...habit,
            history: [...habit.history], // Ensure history is updated
            lastUpdated: new Date().toISOString(),
            streak: calculateStreak(habit.history, habit.target),
          };
        }
        return habit;
      });

      return updatedHabits;
    });
  };
  const handleNavigate = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const addNewHabit = (habit: Habit) => {
    setHabits([
      ...habits,
      {
        ...habit,
        id: habits.length + 1,
        streak: 0,
        history: Array(7).fill(0),
      },
    ]);
    setShowAddHabitModal(false);
  };

  const editHabit = (updatedHabit: Habit) => {
    setHabits(
      habits.map((habit) =>
        habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
      )
    );
    setCurrentEditHabit(null);
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const refreshQuote = () => {
    const newIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[newIndex]);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors ${
        theme === "light" ? "bg-gray-100" : "dark:bg-gray-900"
      }`}
    >
      <Navbar
        onNavigate={handleNavigate}
        activeTab={activeTab}
        onToggleTheme={toggleTheme}
        theme={theme}
      />

      {activeTab === "home" && (
        <>
          <LandingSection
            onGetStarted={() => setActiveTab("dashboard")}
            theme={theme}
          />
          <FeaturesSection theme={theme} />
          <Footer setCurrentView={setActiveTab} theme={theme} />
        </>
      )}

      {activeTab === "dashboard" && (
        <>
          <QuoteWidget quote={quote} onRefresh={refreshQuote} theme={theme} />
          <Dashboard
            habits={habits}
            onUpdateProgress={updateHabitProgress}
            onAddHabit={() => setShowAddHabitModal(true)}
            onEditHabit={(habit) => setCurrentEditHabit(habit)}
            onDeleteHabit={deleteHabit}
            theme={theme}
          />
          <ChartSection
            habits={habits}
            timeframe={currentTimeframe}
            onTimeframeChange={setCurrentTimeframe}
            theme={theme}
          />
          <Footer setCurrentView={setActiveTab} theme={theme} />
        </>
      )}

      {activeTab === "statistics" && (
        <>
          <StatsPage habits={habits} weeklyStats={weeklyStats} theme={theme} />
          <Footer setCurrentView={setActiveTab} theme={theme} />
        </>
      )}

      {showAddHabitModal && (
        <HabitModal
          onClose={() => setShowAddHabitModal(false)}
          onSave={addNewHabit}
          isNew={true}
          theme={theme}
        />
      )}

      {currentEditHabit && (
        <HabitModal
          habit={currentEditHabit}
          onClose={() => setCurrentEditHabit(null)}
          onSave={editHabit}
          onDelete={() => {
            deleteHabit(currentEditHabit.id);
            setCurrentEditHabit(null);
          }}
          isNew={false}
          theme={theme}
        />
      )}
    </div>
  );
};

export default HabitTrackerApp;
